import { AUTH_ROLES_METADATA, AuthRole } from '@api/auth';
import { DoerService, DoerServiceProviderFactory } from '@business';
import { ClassMock, mockClass, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenModule } from '@token';

import { AwsWebhookController } from './aws-webhook.controller';
import { FileType } from './file.type';
import { ConvertedVideoCvParams } from './params/converted-video-cv.params';

let awsWebhkCtrl: AwsWebhookController;

let mockDoerSvc: ClassMock<DoerService>;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [TokenModule],
    providers: [AwsWebhookController, DoerServiceProviderFactory({ useValue: mockDoerSvc })],
  }).compile();

  awsWebhkCtrl = module.get<AwsWebhookController>(AwsWebhookController);
};

describe('AwsWebhookController', () => {
  beforeEach(async () => {
    mockDoerSvc = mockClass(DoerService);
    await createApp();
  });

  describe('when cv processed', () => {
    describe('when video file processed', () => {
      const DOER_ID: string = TestUtils.genMongoId();
      const CV_TYPE: string = '1';
      const FILE_TYPE: FileType = 'VIDEO';
      const FILE_URL: string = 'video-url';

      let convertedVideoCvParams: ConvertedVideoCvParams;

      beforeEach(() => {
        convertedVideoCvParams = new ConvertedVideoCvParams();
        convertedVideoCvParams.doerId = DOER_ID;
        convertedVideoCvParams.cvType = CV_TYPE;
        convertedVideoCvParams.fileType = FILE_TYPE;
        convertedVideoCvParams.fileUrl = FILE_URL;
      });

      it('should pass on params', async () => {
        await awsWebhkCtrl.onCvProcessed(convertedVideoCvParams);

        expect(mockDoerSvc.updateOrCreateVideoCv).toHaveBeenCalledWith(DOER_ID, CV_TYPE, {
          imgUrl: undefined,
          videoUrl: FILE_URL,
        });
      });

      it('should return success', async () => {
        const res = await awsWebhkCtrl.onCvProcessed(convertedVideoCvParams);

        expect(res.success).toBe(true);
      });
    });

    describe('when thumbnail file processed', () => {
      const DOER_ID: string = TestUtils.genMongoId();
      const CV_TYPE: string = '1';
      const FILE_TYPE: FileType = 'THUMBNAIL';
      const FILE_URL: string = 'thumbnail-url';

      let convertedVideoCvParams: ConvertedVideoCvParams;

      beforeEach(() => {
        convertedVideoCvParams = new ConvertedVideoCvParams();
        convertedVideoCvParams.doerId = DOER_ID;
        convertedVideoCvParams.cvType = CV_TYPE;
        convertedVideoCvParams.fileType = FILE_TYPE;
        convertedVideoCvParams.fileUrl = FILE_URL;
      });

      it('should pass on params', async () => {
        await awsWebhkCtrl.onCvProcessed(convertedVideoCvParams);

        expect(mockDoerSvc.updateOrCreateVideoCv).toHaveBeenCalledWith(DOER_ID, CV_TYPE, {
          imgUrl: FILE_URL,
          videoUrl: undefined,
        });
      });

      it('should return success', async () => {
        const res = await awsWebhkCtrl.onCvProcessed(convertedVideoCvParams);

        expect(res.success).toBe(true);
      });
    });
  });

  describe('given security', () => {
    it('only webhook aws can trigger on video cv successfully converted', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, awsWebhkCtrl.onCvProcessed);
      expect(metadata).toEqual([AuthRole.WEBHOOK_AWS]);
    });
  });
});
