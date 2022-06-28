import * as _ from 'lodash';
import { template, TemplateExecutor } from 'lodash';

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

export class BusinessError extends Error {
  code: BusinessErrorCode;

  constructor(code: BusinessErrorCode, params: { [k: string]: string } = {}) {
    super(messages[code](params));
    this.code = code;
    Error.captureStackTrace(this);
  }
}

export enum BusinessErrorCode {
  H00001_QUIZZ_MISSION_NOT_FOUND = 'H00001',
  H00002_QUIZZ_ALREADY_CREATED = 'H00002',
  H00003_QUIZZ_NOT_FOUND = 'H00003',
  H00004_QUIZZ_QUESTION_NOT_FOUND = 'H00004',
  H00005_TIME_TABLE_SHIFTS_INVALID = 'H00005',
  H00006_AGENCY_NOT_FOUND = 'H00006',
  H00007_MISSION_NOT_FOUND = 'H00007',
  H00008_MISSION_NOT_VALIDATABLE = 'H00008',
  H00009_DOER_NOT_FOUND = 'H00009',
  H00010_PRODUCT_NOT_FOUND = 'H00010',
  H00011_DOER_ALREADY_UNLOCKED = 'H00011',
  H00012_DOER_VIDEO_CV_TYPE_INVALID = 'H00012',

  // Chatbot error
  H01000_MISSING_PARAM = 'H01000',
  H01001_DOER_NOT_FOUND = 'H01001',
  H01002_MISSION_NOT_FOUND_BY_CODE = 'H01002',
  H01003_PARAM_INVALID = 'H01003',
}

export const messages: { [k in BusinessErrorCode]: TemplateExecutor } = {
  H00001: template(`The mission of the quizz has not been found.`),
  H00002: template(`The quizz has already been created.`),
  H00003: template(`The quizz has not been found.`),
  H00004: template(`The question of the quizz has not been found.`),
  H00005: template(`The shifts of the time table are invalid.`),
  H00006: template(`The agency with id {{ id }} has not been found.`),
  H00007: template(`The mission with id {{ id }} has not been found.`),
  H00008: template(`The mission with id {{ id }} is not validatable.`),
  H00009: template(`The doer with id {{ id }} has not been found.`),
  H00010: template(`The product with id {{ id }} has not been found.`),
  H00011: template(`The doer with id {{ doerId }} has already been unlocked for mission {{ missionId }}.`),
  H00012: template(`Invalid video cv type {{ cvType }}.`),

  H01000: template(`The parameter {{ param }} is missing.`),
  H01001: template(`Could not find doer for platform id {{ platformId }}.`),
  H01002: template(`Could not find mission for code {{ code }}.`),
  H01003: template(`Param {{ param }} has invalid value {{ value }}.`),
};
