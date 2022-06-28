import { BusinessError, BusinessErrorCode } from '@business/errors/business.error';
import { DoerRepositoryProviderFactory } from '@database';
import { mockDoerRepo, TestUtils } from '@mocks';
import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UseCaseNames } from '../constants/use-case-names';
import { DoerVideoCvType } from '../domains/doer';
import { DoerImpl } from '../domains/doer.impl';
import { DoerFactory } from '../factories/doer.factory';
import { DoerRepository } from '../repositories/doer.repository';
import { DoerVideoCvBatchInitUseCase, DoerVideoCvBatchInitUseCaseBatchParams, DoerVideoCvBatchInitUseCaseProviderFactory } from './doer-video-cv-init-batch.use-case';

const DoerVideoCvBatchInitUseCaseProvider: Provider = DoerVideoCvBatchInitUseCaseProviderFactory();
let doerVideoCvBatchInitUc: DoerVideoCvBatchInitUseCase;

let mockedDoerRepo: Partial<DoerRepository>;

const DOER_ID: string = TestUtils.genMongoId();

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      DoerRepositoryProviderFactory({
        useValue: mockedDoerRepo,
      }),
      DoerVideoCvBatchInitUseCaseProvider,
    ],
    exports: [DoerVideoCvBatchInitUseCaseProvider],
  }).compile();

  doerVideoCvBatchInitUc = module.get<DoerVideoCvBatchInitUseCase>(UseCaseNames.DOER_VIDEO_CV_INIT_BATCH);
};

describe('DoerVideoCvBatchInitUseCase', () => {
  beforeEach(async () => {
    mockedDoerRepo = mockDoerRepo({
      findById: jest.fn().mockResolvedValue(DoerFactory.create({ id: DOER_ID })),
      save: jest.fn().mockImplementation((doer: DoerImpl) => doer),
    });
    await createApp();
  });

  describe('when batch init doer video cv', () => {
    const CV_TYPE: DoerVideoCvType = DoerVideoCvType.INTRODUCTION;
    const QUESTION: string = 'question';
    const BATCH_PARAMS: DoerVideoCvBatchInitUseCaseBatchParams = [
      {
        videoCvType: CV_TYPE,
        videoCvParams: {
          question: QUESTION,
        },
      },
    ];

    it('should save doer', async () => {
      await doerVideoCvBatchInitUc.run(DOER_ID, BATCH_PARAMS);

      expect(mockedDoerRepo.save).toHaveBeenCalled();
    });

    describe('when create video cv', () => {
      it('should create video cv', async () => {
        const doer: DoerImpl = await doerVideoCvBatchInitUc.run(DOER_ID, BATCH_PARAMS);

        expect(doer.workProfile.videoCvs.length).toBe(1);
        expect(doer.workProfile.videoCvs[0].type).toBe(CV_TYPE);
        expect(doer.workProfile.videoCvs[0].question).toBe(QUESTION);
      });
    });

    describe('when update video cv', () => {
      beforeEach(async () => {
        mockedDoerRepo.findById = jest.fn().mockResolvedValue(
          DoerFactory.create({
            id: DOER_ID,
            workProfile: DoerFactory.createDoerWorkProfile({
              videoCvs: [
                DoerFactory.createVideoCv({
                  type: CV_TYPE,
                  imgUrl: 'old-img',
                  videoUrl: 'old-video',
                  question: 'old-question',
                }),
              ],
            }),
          }),
        );
        await createApp();
      });

      it('should reinitialise video cv', async () => {
        const doer: DoerImpl = await doerVideoCvBatchInitUc.run(DOER_ID, BATCH_PARAMS);

        expect(doer.workProfile.videoCvs.length).toBe(1);
        expect(doer.workProfile.videoCvs[0].type).toBe(CV_TYPE);
        expect(doer.workProfile.videoCvs[0].imgUrl).toBe('');
        expect(doer.workProfile.videoCvs[0].videoUrl).toBe('');
        expect(doer.workProfile.videoCvs[0].question).toBe(QUESTION);
      });
    });
  });

  describe('when cv type invalid', () => {
    const CV_TYPE_INVALID: string = 'CV_TYPE_INVALID';
    const BATCH_PARAMS: DoerVideoCvBatchInitUseCaseBatchParams = [
      {
        videoCvType: CV_TYPE_INVALID,
        videoCvParams: {},
      },
    ];

    it('should throw business error H00012', async () => {
      expect.assertions(2);

      try {
        await doerVideoCvBatchInitUc.run(DOER_ID, BATCH_PARAMS);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00012_DOER_VIDEO_CV_TYPE_INVALID);
          expect(ex.message).toContain(CV_TYPE_INVALID);
        }
      }
    });
  });

  describe('when doer not found', () => {
    const BATCH_PARAMS: DoerVideoCvBatchInitUseCaseBatchParams = [
      {
        videoCvType: DoerVideoCvType.INTRODUCTION,
        videoCvParams: {},
      },
    ];

    beforeEach(async () => {
      mockedDoerRepo.findById = jest.fn().mockResolvedValue(null);
      await createApp();
    });

    it('should throw business error H00009', async () => {
      expect.assertions(2);

      try {
        await doerVideoCvBatchInitUc.run(DOER_ID, BATCH_PARAMS);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H00009_DOER_NOT_FOUND);
          expect(ex.message).toContain(DOER_ID);
        }
      }
    });
  });
});
