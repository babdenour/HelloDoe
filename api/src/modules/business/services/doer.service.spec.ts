import { DoerRepositoryBusiness } from '@business';
import { DoerRepositoryProviderFactory } from '@database';
import { mockDoerRepo, TestUtils } from '@mocks';
import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ServiceNames } from '../constants/service-names';
import { DoerVideoCvType } from '../domains/doer';
import { DoerImpl } from '../domains/doer.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { DoerFactory } from '../factories/doer.factory';
import { DoerServiceProviderFactory } from '../providers';
import { DoerService } from './doer.service';

const doerServiceProvider: Provider = DoerServiceProviderFactory();
let doerSvc: DoerService;

let mockedDoerRepo: Partial<DoerRepositoryBusiness>;

const DOER_ID: string = TestUtils.genMongoId();

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      DoerRepositoryProviderFactory({
        useValue: mockedDoerRepo,
      }),
      doerServiceProvider,
    ],
    exports: [doerServiceProvider],
  }).compile();

  doerSvc = module.get<DoerService>(ServiceNames.DOER);
};

describe('DoerService', () => {
  beforeEach(async () => {
    mockedDoerRepo = mockDoerRepo({
      findById: jest.fn().mockResolvedValue(DoerFactory.create({ id: DOER_ID })),
      save: jest.fn().mockImplementation((doer: DoerImpl) => doer),
    });
    await createApp();
  });

  describe('doesDoerExistById', () => {
    const DOER_ID: string = TestUtils.genMongoId();

    describe('when doer exists', () => {
      it('should return true', async () => {
        const doesExist: boolean = await doerSvc.doesDoerExistById(DOER_ID);

        expect(doesExist).toBe(true);
      });
    });

    describe('when doer does not exist', () => {
      beforeEach(async () => {
        mockedDoerRepo.findById = jest.fn().mockResolvedValue(null);
        await createApp();
      });

      it('should return false', async () => {
        const doesExist: boolean = await doerSvc.doesDoerExistById(DOER_ID);

        expect(doesExist).toBe(false);
      });
    });
  });

  describe('when update or create video cv', () => {
    const VIDEO_CV_TYPE: DoerVideoCvType = DoerVideoCvType.INTRODUCTION;
    const VIDEO_CV_IMG_URL: string = 'new-img-url';
    const VIDEO_CV_QUESTION: string = 'new-question';
    const VIDEO_CV_VIDEO_URL: string = 'new-video-url';

    it('should save doer', async () => {
      await doerSvc.updateOrCreateVideoCv(DOER_ID, VIDEO_CV_TYPE, {});

      expect(mockedDoerRepo.save).toHaveBeenCalled();
    });

    describe('when update', () => {
      beforeEach(async () => {
        mockedDoerRepo.findById = jest.fn().mockResolvedValue(
          DoerFactory.create({
            id: DOER_ID,
            workProfile: DoerFactory.createDoerWorkProfile({
              videoCvs: [
                DoerFactory.createVideoCv({
                  type: VIDEO_CV_TYPE,
                }),
              ],
            }),
          }),
        );
        await createApp();
      });

      it('should update', async () => {
        const doer: DoerImpl = await doerSvc.updateOrCreateVideoCv(DOER_ID, VIDEO_CV_TYPE, {
          imgUrl: VIDEO_CV_IMG_URL,
          question: VIDEO_CV_QUESTION,
          videoUrl: VIDEO_CV_VIDEO_URL,
        });

        expect(doer.workProfile.videoCvs.length).toBe(1);
        expect(doer.workProfile.videoCvs[0].type).toBe(VIDEO_CV_TYPE);
        expect(doer.workProfile.videoCvs[0].imgUrl).toBe(VIDEO_CV_IMG_URL);
        expect(doer.workProfile.videoCvs[0].question).toBe(VIDEO_CV_QUESTION);
        expect(doer.workProfile.videoCvs[0].videoUrl).toBe(VIDEO_CV_VIDEO_URL);
      });
    });

    describe('when create', () => {
      beforeEach(async () => {
        mockedDoerRepo.findById = jest.fn().mockResolvedValue(
          DoerFactory.create({
            id: DOER_ID,
            workProfile: DoerFactory.createDoerWorkProfile({
              videoCvs: [],
            }),
          }),
        );
        await createApp();
      });

      it('should create', async () => {
        const doer: DoerImpl = await doerSvc.updateOrCreateVideoCv(DOER_ID, VIDEO_CV_TYPE, {
          imgUrl: VIDEO_CV_IMG_URL,
          question: VIDEO_CV_QUESTION,
          videoUrl: VIDEO_CV_VIDEO_URL,
        });

        expect(doer.workProfile.videoCvs.length).toBe(1);
        expect(doer.workProfile.videoCvs[0].type).toBe(VIDEO_CV_TYPE);
        expect(doer.workProfile.videoCvs[0].imgUrl).toBe(VIDEO_CV_IMG_URL);
        expect(doer.workProfile.videoCvs[0].question).toBe(VIDEO_CV_QUESTION);
        expect(doer.workProfile.videoCvs[0].videoUrl).toBe(VIDEO_CV_VIDEO_URL);
      });
    });

    describe('when invalid cv type', () => {
      const VIDEO_CV_TYPE: string = 'INVALID_TYPE';

      it('should throw error', async () => {
        await expect(() => doerSvc.updateOrCreateVideoCv(DOER_ID, VIDEO_CV_TYPE, {})).rejects.toThrow();
      });
    });

    describe('when doer not found', () => {
      beforeEach(async () => {
        mockedDoerRepo.findById = jest.fn().mockResolvedValue(null);
        await createApp();
      });

      it('should throw business error H00009', async () => {
        expect.assertions(2);

        try {
          await doerSvc.updateOrCreateVideoCv(DOER_ID, VIDEO_CV_TYPE, {});
        } catch (ex: unknown) {
          if (ex instanceof BusinessError) {
            expect(ex.code).toBe(BusinessErrorCode.H00009_DOER_NOT_FOUND);
            expect(ex.message).toContain(DOER_ID);
          }
        }
      });
    });
  });
});
