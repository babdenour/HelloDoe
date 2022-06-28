import { DoerVideoCvBatchInitUseCase, DoerVideoCvBatchInitUseCaseBatchParams, InjectDoerVideoCvBatchInitUseCase } from '@business';
import { ConfigKeys, ConfigService } from '@config';
import { Body, Controller, HttpService, Post, UseFilters, UsePipes } from '@nestjs/common';
import { trim } from 'lodash';

import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { VideoAskEventParams, VideoAskEventParamsAnswer, VideoAskEventParamsQuestion } from './params/video-ask-event.params';

interface EventParsedVideoCv {
  cvType: string;
  question: string;
  imgUrl: string;
  videoUrl: string;
}

interface EventParsed {
  doerId: string;
  videoCvs: EventParsedVideoCv[];
}

interface UploadApiParams {
  doerId: string;
  cvType: string;
  sourceUrl: string;
}

// TODO: Move annotations to global app instances
@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@Controller('webhook/video-ask')
export class VideoAskWebhookController {
  constructor(
    private readonly configSvc: ConfigService,
    private readonly httpSvc: HttpService,
    @InjectDoerVideoCvBatchInitUseCase private readonly doerVideoCvBatchInitUc: DoerVideoCvBatchInitUseCase,
  ) {}

  @Post()
  async handleRequest(@Body() body: VideoAskEventParams): Promise<void> {
    if (body.event_type === 'form_response_transcribed') {
      await this.handleFormResponseTranscribedEvent(body);
    }
  }

  private async handleFormResponseTranscribedEvent(event: VideoAskEventParams): Promise<void> {
    const parsedEvent = this.parseEvent(event);

    await this.initVideoCvs(parsedEvent);
    await this.uploadVideoCvFiles(parsedEvent);
  }

  private async initVideoCvs({ doerId, videoCvs }: EventParsed): Promise<void> {
    const initVideoCvBatchParams: DoerVideoCvBatchInitUseCaseBatchParams = videoCvs.map((videoCv: EventParsedVideoCv) => ({
      videoCvType: videoCv.cvType,
      videoCvParams: {
        question: videoCv.question,
      },
    }));

    await this.doerVideoCvBatchInitUc.run(doerId, initVideoCvBatchParams);
  }

  private async uploadVideoCvFiles({ doerId, videoCvs }: EventParsed): Promise<void> {
    for (const videoCv of videoCvs) {
      await this.uploadFile(doerId, videoCv.cvType, videoCv.imgUrl);
      await this.uploadFile(doerId, videoCv.cvType, videoCv.videoUrl);
    }
  }

  private async uploadFile(doerId: string, cvType: string, sourceUrl: string): Promise<void> {
    const data: UploadApiParams = { doerId, cvType, sourceUrl };
    await this.httpSvc.post(this.configSvc.get<string>(ConfigKeys.UPLOAD_API_ENDPOINT), JSON.stringify(data)).toPromise();
  }

  private parseEvent(event: VideoAskEventParams): EventParsed {
    const doerId = event.contact.variables.doer_id;

    const questions = event.form.questions
      .map((question: VideoAskEventParamsQuestion) => {
        const { cvType, questionText } = this.extractQuestionCvTypeFromText(question.metadata.text);

        return { cvType, questionText, question };
      })
      .filter((params) => !!params.cvType)
      .reduce((acc: Map<string, { id: string; cvType: string; text: string }>, params) => {
        acc.set(params.question.question_id, {
          id: params.question.question_id,
          cvType: params.cvType,
          text: params.questionText,
        });

        return acc;
      }, new Map<string, { id: string; cvType: string; text: string }>());

    const videoCvs = event.contact.answers
      .filter((answer: VideoAskEventParamsAnswer) => answer.type === 'video')
      .filter((answer: VideoAskEventParamsAnswer) => questions.get(answer.question_id))
      .map((answer: VideoAskEventParamsAnswer) => {
        const question = questions.get(answer.question_id);

        return {
          cvType: question.cvType,
          question: question.text,
          imgUrl: answer.thumbnail,
          videoUrl: answer.media_url,
        };
      });

    return {
      doerId,
      videoCvs,
    };
  }

  private extractQuestionCvTypeFromText(text: string): { cvType: string; questionText: string } {
    const cvType: string = /#(\d*)/.exec(text)?.[1];
    const questionText: string = trim(text.replace(`#${cvType}`, ''));

    return { cvType, questionText };
  }
}
