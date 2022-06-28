import { BusinessError, BusinessErrorCode, DoerImplBsn } from '@business';
import { DoerRepository, InjectDoerRepository } from '@database';
import { Injectable } from '@nestjs/common';

import { ActionNames } from '../constants/action-names';
import { Action } from '../domains/action';
import { HandlerDecorator } from '../handler.decorator';
import { ActionHandler } from '../types/action-handler';
import { MessagingPlatform } from '../types/messaging-platform';

enum AttributesUpdatable {
  FIRST_NAME = 'FIRST_NAME',
  LAST_NAME = 'LAST_NAME',
  EMAIL = 'EMAIL',
  GENDER = 'GENDER',
  BIRTHDAY = 'BIRTHDAY',
  COUNTRY = 'COUNTRY',
  CITY = 'CITY',
  NATIONALITY = 'NATIONALITY',
  DEPARTMENT = 'DEPARTMENT',
  ADDRESS = 'ADDRESS',
  PHONE = 'PHONE',
  SIRET = 'SIRET',
  RESIDENCE_PERMIT_OK = 'RESIDENCE_PERMIT_OK',
}

enum GenderValues {
  'MALE' = 0,
  'FEMALE' = 1,
}

interface ExtractedParams {
  attribute: string;
  doer: DoerImplBsn;
  value: string;
}

@Injectable()
@HandlerDecorator()
export class ProfileUpdateHandler implements ActionHandler {
  constructor(@InjectDoerRepository private readonly doerRepo: DoerRepository) {}

  public canHandle(action: Action): boolean {
    return action.name === ActionNames.PROFILE_UPDATE;
  }

  public async handle(action: Action, messagingPlatform: MessagingPlatform): Promise<void> {
    const { attribute, doer, value } = await this.extractParams(action, messagingPlatform);
    await this.updateDoer(doer, attribute, value);
  }

  private async extractParams(action: Action, messagingPlatform: MessagingPlatform): Promise<ExtractedParams> {
    const doer: DoerImplBsn = await messagingPlatform.getDoer();

    if (!doer) {
      throw new BusinessError(BusinessErrorCode.H01001_DOER_NOT_FOUND, {
        platformId: messagingPlatform.getDoerPlatformId(),
      });
    }

    const attribute = action.getParameter('attribute');
    const value = action.getParameter('value');

    if (!attribute) {
      throw new BusinessError(BusinessErrorCode.H01000_MISSING_PARAM, { param: 'attribute' });
    } else if (!AttributesUpdatable[attribute]) {
      throw new BusinessError(BusinessErrorCode.H01003_PARAM_INVALID, { param: 'attribute', value: attribute });
    } else if (value == null) {
      throw new BusinessError(BusinessErrorCode.H01000_MISSING_PARAM, { param: 'value' });
    }

    return { attribute, doer, value };
  }

  private async updateDoer(doer: DoerImplBsn, attribute: string, value: string): Promise<void> {
    if (attribute === AttributesUpdatable.FIRST_NAME) {
      doer.profile.firstName = value;
    } else if (attribute === AttributesUpdatable.LAST_NAME) {
      doer.profile.lastName = value;
    } else if (attribute === AttributesUpdatable.EMAIL) {
      doer.profile.email = value;
    } else if (attribute === AttributesUpdatable.SIRET) {
      doer.workProfile.siret = value;
    } else if (attribute === AttributesUpdatable.PHONE) {
      doer.profile.phone = value;
    } else if (attribute === AttributesUpdatable.GENDER) {
      const gender = GenderValues[value] as number;
      if (gender == null) {
        throw new BusinessError(BusinessErrorCode.H01003_PARAM_INVALID, { param: AttributesUpdatable.GENDER, value });
      }
      doer.profile.gender = gender;
    } else if (attribute === AttributesUpdatable.BIRTHDAY) {
      doer.profile.birthday = value;
    } else if (attribute === AttributesUpdatable.CITY) {
      doer.profile.city = value;
    } else if (attribute === AttributesUpdatable.COUNTRY) {
      doer.profile.country = value;
    } else if (attribute === AttributesUpdatable.NATIONALITY) {
      doer.profile.nationality = value;
    } else if (attribute === AttributesUpdatable.RESIDENCE_PERMIT_OK) {
      doer.profile.residencePermitOk = value === 'true';
    } else if (attribute === AttributesUpdatable.DEPARTMENT) {
      doer.profile.department = parseInt(value, 10);
    } else if (attribute === AttributesUpdatable.ADDRESS) {
      doer.profile.address = value;
    }

    await this.doerRepo.save(doer);
  }
}
