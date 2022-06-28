import { InjectDoerRepository } from '@database';
import { isValidEnumValue } from '@libs/hellodash';
import { ProviderFactory } from '@modules/provider.factory';
import { Inject, Injectable } from '@nestjs/common';
import { defaultTo } from 'lodash';

import { UseCaseNames } from '../constants/use-case-names';
import { DoerVideoCv, DoerVideoCvType } from '../domains/doer';
import { DoerImpl } from '../domains/doer.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { DoerFactory } from '../factories/doer.factory';
import { DoerRepository } from '../repositories/doer.repository';

export type DoerVideoCvBatchInitUseCaseBatchParams = { videoCvType: string; videoCvParams: Partial<Pick<DoerVideoCv, 'imgUrl' | 'question' | 'videoUrl'>> }[];

@Injectable()
export class DoerVideoCvBatchInitUseCase {
  constructor(@InjectDoerRepository private readonly doerRepo: DoerRepository) {}

  public async run(doerId: string, batchParams: DoerVideoCvBatchInitUseCaseBatchParams): Promise<DoerImpl> {
    let doer: DoerImpl = await this.doerRepo.findById(doerId);

    if (!doer) {
      throw new BusinessError(BusinessErrorCode.H00009_DOER_NOT_FOUND, { id: doerId });
    }

    for (const param of batchParams) {
      if (!isValidEnumValue(DoerVideoCvType, param.videoCvType)) {
        throw new BusinessError(BusinessErrorCode.H00012_DOER_VIDEO_CV_TYPE_INVALID, { cvType: param.videoCvType });
      }
    }

    for (const param of batchParams) {
      this.initVideoCv(doer, param.videoCvType as DoerVideoCvType, param.videoCvParams);
    }

    doer = await this.doerRepo.save(doer);

    return doer;
  }

  private initVideoCv(doer: DoerImpl, videoCvType: DoerVideoCvType, videoCvParams: Partial<Pick<DoerVideoCv, 'imgUrl' | 'question' | 'videoUrl'>>): DoerImpl {
    const videoCvIdx: number = doer.workProfile.videoCvs.findIndex((cv: DoerVideoCv) => cv.type === videoCvType);

    let videoCv: DoerVideoCv;
    if (videoCvIdx === -1) {
      videoCv = DoerFactory.createVideoCv({ type: videoCvType as DoerVideoCvType });
      doer.workProfile.videoCvs.push(videoCv);
    } else {
      doer.workProfile.videoCvs[videoCvIdx] = DoerFactory.createVideoCv({ type: videoCvType as DoerVideoCvType });
      videoCv = doer.workProfile.videoCvs[videoCvIdx];
    }

    videoCv.imgUrl = defaultTo(videoCvParams.imgUrl, videoCv.imgUrl);
    videoCv.question = defaultTo(videoCvParams.question, videoCv.question);
    videoCv.videoUrl = defaultTo(videoCvParams.videoUrl, videoCv.videoUrl);

    return doer;
  }
}

// eslint-disable-next-line @typescript-eslint/typedef
export const DoerVideoCvBatchInitUseCaseProviderFactory = ProviderFactory.createFactory(UseCaseNames.DOER_VIDEO_CV_INIT_BATCH, {
  useClass: DoerVideoCvBatchInitUseCase,
});

// eslint-disable-next-line @typescript-eslint/typedef
export const InjectDoerVideoCvBatchInitUseCase = Inject(UseCaseNames.DOER_VIDEO_CV_INIT_BATCH);
