import {
  BusinessError,
  BusinessErrorCode,
  DoerImplBsn,
  InjectQuestionService,
  MessagesFactory,
  MissionBusinessImpl,
  QuestionImplBusiness,
  QuestionService,
  QuestionSheetFactory,
  QuestionSheetImplBusiness,
  QuizzImplBusiness,
  QuizzSheetService,
  ServiceNamesBusiness,
} from '@business';
import {
  InjectMissionRepository,
  InjectQuestionRepository,
  InjectQuestionSheetRepository,
  InjectQuizzRepository,
  MissionRepository,
  QuestionRepository,
  QuestionSheetRepository,
  QuizzRepository,
} from '@database';
import { Inject, Injectable } from '@nestjs/common';

import { ActionNames } from '../constants/action-names';
import { FollowupEvents } from '../constants/followup-events';
import { Action } from '../domains/action';
import { HandlerDecorator } from '../handler.decorator';
import { ActionHandler } from '../types/action-handler';
import { MessagingPlatform } from '../types/messaging-platform';

interface ExtractedParams {
  answer: string;
  doer: DoerImplBsn;
  firstQuestion: boolean;
  questionId: string;
  quizz: QuizzImplBusiness;
}

@Injectable()
@HandlerDecorator()
export class QuizzGetAnswerHandler implements ActionHandler {
  constructor(
    @InjectMissionRepository private readonly missionRepo: MissionRepository,
    @InjectQuestionRepository private readonly questionRepo: QuestionRepository,
    @InjectQuestionService private readonly questionSvc: QuestionService,
    @InjectQuestionSheetRepository private readonly questionSheetRepo: QuestionSheetRepository,
    @InjectQuizzRepository private readonly quizzRepo: QuizzRepository,
    @Inject(ServiceNamesBusiness.QUIZZ_SHEET) private readonly quizzSheetSvc: QuizzSheetService,
  ) {}

  public canHandle(action: Action): boolean {
    return action.name === ActionNames.QUIZZ_GET_ANSWER;
  }

  public async handle(action: Action, messagingPlatform: MessagingPlatform): Promise<void> {
    const extractedParams = await this.extractParams(action, messagingPlatform);

    if (extractedParams.firstQuestion) {
      await this.handleFirstQuestion(action, extractedParams);
    } else {
      await this.handleAnswer(action, extractedParams);
    }
  }

  private async handleFirstQuestion(action: Action, { doer, quizz }: ExtractedParams): Promise<void> {
    const nextQuestion: QuestionImplBusiness = await this.findNextQuestion(doer.id, quizz.id);
    this.setIntentToNextQuestion(action, nextQuestion);
  }

  private async handleAnswer(action: Action, { answer, doer, questionId, quizz }: ExtractedParams): Promise<void> {
    const question: QuestionImplBusiness = await this.questionRepo.findById(questionId);
    if (question.isAnswerValid(answer)) {
      await this.saveAnswer(answer, question, doer, quizz);

      const nextQuestion: QuestionImplBusiness = await this.findNextQuestion(doer.id, quizz.id);
      if (nextQuestion) {
        this.setIntentToNextQuestion(action, nextQuestion);
      } else {
        await this.quizzSheetSvc.computeResults(doer.id, quizz.id);
        this.setIntentToOutroSlow(action);
      }
    } else {
      question.messages.unshift(
        MessagesFactory.createText({
          text: `La réponse ne correspond pas au format attendu, on remet la question ici pour que tu puisses corriger ça 😉`,
        }),
      );
      this.setIntentToNextQuestion(action, question);
    }
  }

  private setIntentToNextQuestion(action: Action, nextQuestion: QuestionImplBusiness): void {
    action.messages = nextQuestion.messages;
    action.setContextParameter('quizz', 'questionId', nextQuestion.id);
  }

  private setIntentToOutroSlow(action: Action): void {
    action.followupEvent = FollowupEvents.QUIZZ_OUTRO_SLOW;
  }

  private async findNextQuestion(doerId: string, quizzId: string): Promise<QuestionImplBusiness | undefined> {
    const questionleftList: QuestionImplBusiness[] = await this.questionSvc.getUnansweredQuestions(doerId, quizzId);

    return questionleftList.length > 0 ? questionleftList[0] : undefined;
  }

  private async saveAnswer(answer: string, question: QuestionImplBusiness, doer: DoerImplBsn, quizz: QuizzImplBusiness): Promise<void> {
    const score = question.getAnswerScore(answer);
    const sheet: QuestionSheetImplBusiness = QuestionSheetFactory.create({
      answer,
      doer: doer.id,
      question: question.id,
      quizz: quizz.id,
      score,
    });
    await this.questionSheetRepo.save(sheet);
  }

  private async extractParams(action: Action, messagingPlatform: MessagingPlatform): Promise<ExtractedParams> {
    const answer = action.getParameter('answer');
    const questionId = action.getContextParameter('quizz', 'questionId');
    const firstQuestion = action.getParameter('firstQuestion') === 'true';
    const missionCode = action.getContextParameter('quizz', 'missionCode');

    if (!missionCode) {
      throw new BusinessError(BusinessErrorCode.H01000_MISSING_PARAM, { param: 'missionCode' });
    } else if (!firstQuestion && !questionId) {
      throw new BusinessError(BusinessErrorCode.H01000_MISSING_PARAM, { param: 'questionId' });
    }

    const mission: MissionBusinessImpl = await this.missionRepo.findByCode(missionCode);
    const quizz = await this.quizzRepo.findByMissionId(mission.id);
    const doer: DoerImplBsn = await messagingPlatform.getDoer();

    return { answer, doer, firstQuestion, questionId, quizz };
  }
}
