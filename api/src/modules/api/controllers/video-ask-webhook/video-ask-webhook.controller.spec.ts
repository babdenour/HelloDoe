/* eslint-disable @typescript-eslint/naming-convention */

import { AUTH_ROLES_METADATA } from '@api/auth';
import { DoerVideoCvBatchInitUseCaseProviderFactory, DoerVideoCvTypeBsn } from '@business';
import { ConfigModule } from '@config';
import { TestUtils } from '@mocks';
import { PartialDeep } from '@modules/types/partial-deep';
import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { VideoAskEventParams } from './params/video-ask-event.params';
import { VideoAskWebhookController } from './video-ask-webhook.controller';

let videoAskWebhkCtrl: VideoAskWebhookController;

let mockPost: jest.Mock;
let mockRun: jest.Mock;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule],
    providers: [
      {
        provide: HttpService,
        useValue: {
          post: mockPost,
        },
      },
      DoerVideoCvBatchInitUseCaseProviderFactory({
        useValue: {
          run: mockRun,
        },
      }),
    ],
    controllers: [VideoAskWebhookController],
  }).compile();

  videoAskWebhkCtrl = module.get<VideoAskWebhookController>(VideoAskWebhookController);
};

describe('VideoAskWebhookController', () => {
  beforeEach(async () => {
    mockPost = jest.fn().mockImplementation(() => ({ toPromise: jest.fn() }));
    mockRun = jest.fn();
    await createApp();
  });

  describe('when receive form response transcribed event', () => {
    const DOER_ID: string = TestUtils.genMongoId();
    const QUESTION: string = 'Présente-toi en quelques mots';
    const QUESTION_ID: string = TestUtils.genMongoId();
    const CV_TYPE: DoerVideoCvTypeBsn = DoerVideoCvTypeBsn.INTRODUCTION;
    const EVENT: PartialDeep<VideoAskEventParams> = {
      event_type: 'form_response_transcribed',
      contact: {
        answers: [
          {
            type: 'video',
            question_id: QUESTION_ID,
            media_url: 'media-url',
            thumbnail: 'thumbnail',
          },
          {
            type: 'other' as any,
            question_id: QUESTION_ID,
            media_url: 'media-url',
            thumbnail: 'thumbnail',
          },
        ],
        variables: {
          doer_id: DOER_ID,
        },
      },
      form: {
        questions: [
          {
            metadata: {
              text: `${QUESTION} #${CV_TYPE}`,
            },
            question_id: QUESTION_ID,
          },
        ],
      },
    };

    it('should batch init doer video cv with right params', async () => {
      await videoAskWebhkCtrl.handleRequest(EVENT as VideoAskEventParams);

      expect(mockRun).toHaveBeenCalledWith(DOER_ID, [
        {
          videoCvType: CV_TYPE,
          videoCvParams: {
            question: QUESTION,
          },
        },
      ]);
    });

    it('should upload video cvs files', async () => {
      await videoAskWebhkCtrl.handleRequest(EVENT as VideoAskEventParams);

      expect(mockPost).toHaveBeenCalledTimes(2);
      expect(mockPost.mock.calls).toEqual([
        ['', '{"doerId":"000000000000000000000000","cvType":"1","sourceUrl":"thumbnail"}'],
        ['', '{"doerId":"000000000000000000000000","cvType":"1","sourceUrl":"media-url"}'],
      ]);
    });
  });

  describe('given security', () => {
    it('only webhook aws can trigger on video cv successfully converted', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method, @typescript-eslint/typedef
      const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, videoAskWebhkCtrl.handleRequest);
      expect(metadata).toBe(undefined);
    });
  });
});
