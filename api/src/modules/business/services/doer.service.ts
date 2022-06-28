import { InjectDoerRepository } from '@database';
import { isValidEnumValue } from '@libs/hellodash';
import { Injectable } from '@nestjs/common';
import { defaultTo } from 'lodash';

import { DoerVideoCv, DoerVideoCvType } from '../domains/doer';
import { DoerImpl } from '../domains/doer.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { DoerFactory } from '../factories/doer.factory';
import { DoerRepository } from '../repositories/doer.repository';

@Injectable()
export class DoerService {
  constructor(@InjectDoerRepository private readonly doerRepo: DoerRepository) {}

  public async doesDoerExistById(doerId: string): Promise<boolean> {
    const doer: DoerImpl = await this.doerRepo.findById(doerId);

    return doer != null;
  }

  public async updateOrCreateVideoCv(doerId: string, videoCvType: string, videoCvParams: Partial<Pick<DoerVideoCv, 'imgUrl' | 'question' | 'videoUrl'>>): Promise<DoerImpl> {
    let doer: DoerImpl = await this.doerRepo.findById(doerId);

    if (!doer) {
      throw new BusinessError(BusinessErrorCode.H00009_DOER_NOT_FOUND, { id: doerId });
    }

    if (!isValidEnumValue(DoerVideoCvType, videoCvType)) {
      throw new Error(`Invalid video cv type: "${videoCvType}"`);
    }

    const videoCvIdx: number = doer.workProfile.videoCvs.findIndex((cv: DoerVideoCv) => cv.type === videoCvType);

    let videoCv: DoerVideoCv;
    if (videoCvIdx === -1) {
      videoCv = DoerFactory.createVideoCv({ type: videoCvType as DoerVideoCvType });
      doer.workProfile.videoCvs.push(videoCv);
    } else {
      videoCv = doer.workProfile.videoCvs[videoCvIdx];
    }

    videoCv.imgUrl = defaultTo(videoCvParams.imgUrl, videoCv.imgUrl);
    videoCv.question = defaultTo(videoCvParams.question, videoCv.question);
    videoCv.videoUrl = defaultTo(videoCvParams.videoUrl, videoCv.videoUrl);

    doer = await this.doerRepo.save(doer);

    return doer;
  }
}
