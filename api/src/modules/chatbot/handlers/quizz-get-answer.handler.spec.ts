import {
  BusinessError,
  BusinessErrorCode,
  BusinessModule,
  DoerFactory,
  DoerImplBsn,
  MessageType,
  MissionFactory,
  QuestionFactory,
  QuestionSheetFactory,
  QuickRepliesMessageBusiness,
  QuizzFactory,
  QuizzSheetImplBusiness,
  TextMessageImplBusiness,
} from '@business';
import { ConfigModule } from '@config';
import { DoerRepository, MissionRepository, QuestionRepository, QuestionSheetRepository, QuizzRepository, QuizzSheetRepository, RepositoryNames } from '@database';
import { I18nModule } from '@i18n';
import { cleanDatabase, getConnection, mockMessagingPlatform, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { ChatbotModule } from '../chatbot.module';
import { FollowupEvents } from '../constants/followup-events';
import { Action } from '../domains/action';
import { MessagingPlatform } from '../types/messaging-platform';
import { QuizzGetAnswerHandler } from './quizz-get-answer.handler';

const ANSWER = 'answer';
const SCORE = 5;
const MISSION_CODE = 'HD_TEST';

let connection: Connection;
let handler: QuizzGetAnswerHandler;
let doerRepo: DoerRepository;
let missionRepo: MissionRepository;
let questionRepo: QuestionRepository;
let questionSheetRepo: QuestionSheetRepository;
let quizzRepo: QuizzRepository;
let quizzSheetRepo: QuizzSheetRepository;

let action: Action;
let mockAnswer: string;
let mockQuestionId: string;
let mockFirstQuestion: 'true' | 'false';
let mockMissionCode: string;
let mockSetContextParameter = jest.fn();

let messagingPlatform: MessagingPlatform;
let mockDoer: DoerImplBsn;
let mockGetDoer: jest.Mock;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [BusinessModule, ChatbotModule, ConfigModule, I18nModule],
    providers: [QuizzGetAnswerHandler],
  }).compile();

  connection = getConnection(module);
  handler = module.get<QuizzGetAnswerHandler>(QuizzGetAnswerHandler);
  doerRepo = module.get<DoerRepository>(RepositoryNames.DOER);
  missionRepo = module.get<MissionRepository>(RepositoryNames.MISSION);
  questionRepo = module.get<QuestionRepository>(RepositoryNames.QUESTION);
  questionSheetRepo = module.get<QuestionSheetRepository>(RepositoryNames.QUESTION_SHEET);
  quizzRepo = module.get<QuizzRepository>(RepositoryNames.QUIZZ);
  quizzSheetRepo = module.get<QuizzSheetRepository>(RepositoryNames.QUIZZ_SHEET);

  action = createAction();
  messagingPlatform = mockMessagingPlatform({
    getDoer: mockGetDoer,
  });
};

const createAction = (): Action => {
  return ({
    getParameter: (param: string) => (param === 'answer' ? mockAnswer : mockFirstQuestion),
    getContextParameter: (_: string, param: string) => (param === 'missionCode' ? mockMissionCode : mockQuestionId),
    setContextParameter: mockSetContextParameter,
  } as unknown) as Action;
};

describe('QuizzGetAnswerHandler', () => {
  beforeEach(async () => {
    mockMissionCode = MISSION_CODE;
    mockSetContextParameter = jest.fn();
    mockAnswer = '';
    mockQuestionId = '';
    mockFirstQuestion = 'true';

    mockGetDoer = jest.fn().mockImplementation(() => mockDoer);
    await createApp();
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe(`when first question`, () => {
    const MISSION_ID = TestUtils.genMongoId();
    const QUESTION_ID = TestUtils.genMongoId();
    const MESSAGE: QuickRepliesMessageBusiness = {
      type: MessageType.QUICK_REPLIES,
      text: 'text',
      choices: [
        {
          text: ANSWER,
          score: SCORE,
        },
      ],
    };

    beforeEach(async () => {
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_ID,
          code: MISSION_CODE,
        }),
      );
      await questionRepo.save(
        QuestionFactory.create({
          id: QUESTION_ID,
          messages: [MESSAGE],
        }),
      );
      await quizzRepo.save(
        QuizzFactory.create({
          mission: MISSION_ID,
          questions: [QUESTION_ID],
        }),
      );
      mockDoer = await doerRepo.save(DoerFactory.create());
      await createApp();
    });

    it(`should return first question`, async () => {
      await handler.handle(action, messagingPlatform);

      expect(action.messages).toEqual([MESSAGE]);
      expect(mockSetContextParameter).toHaveBeenCalledWith('quizz', 'questionId', QUESTION_ID);
    });
  });

  describe(`when answer question`, () => {
    const DOER_ID = TestUtils.genMongoId();
    const MISSION_ID = TestUtils.genMongoId();
    const QUESTION_ID_0 = TestUtils.genMongoId();
    const QUESTION_ID_1 = TestUtils.genMongoId();
    const QUIZZ_ID = TestUtils.genMongoId();
    const MESSAGE: QuickRepliesMessageBusiness = {
      type: MessageType.QUICK_REPLIES,
      text: 'text',
      choices: [
        {
          text: ANSWER,
          score: SCORE,
        },
      ],
    };

    beforeEach(async () => {
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_ID,
          code: MISSION_CODE,
        }),
      );
      await Promise.all([
        questionRepo.save(
          QuestionFactory.create({
            id: QUESTION_ID_0,
            messages: [MESSAGE],
          }),
        ),
        questionRepo.save(
          QuestionFactory.create({
            id: QUESTION_ID_1,
            messages: [MESSAGE],
          }),
        ),
      ]);
      await quizzRepo.save(
        QuizzFactory.create({
          id: QUIZZ_ID,
          mission: MISSION_ID,
          questions: [QUESTION_ID_0, QUESTION_ID_1],
        }),
      );
      mockDoer = await doerRepo.save(
        DoerFactory.create({
          id: DOER_ID,
        }),
      );

      mockAnswer = ANSWER;
      mockQuestionId = QUESTION_ID_0;
      mockFirstQuestion = 'false';
      await createApp();
    });

    it(`should return next question`, async () => {
      await handler.handle(action, messagingPlatform);

      expect(action.messages).toEqual([MESSAGE]);
      expect(mockSetContextParameter).toHaveBeenCalledWith('quizz', 'questionId', QUESTION_ID_1);
    });

    it(`should save answer`, async () => {
      await handler.handle(action, messagingPlatform);

      const sheets = await questionSheetRepo.findAll();

      expect(sheets.length).toBe(1);
      expect(sheets[0].answer).toBe(ANSWER);
      expect(sheets[0].score).toBe(SCORE);
      expect(sheets[0].doer).toBe(DOER_ID);
      expect(sheets[0].question).toBe(QUESTION_ID_0);
      expect(sheets[0].quizz).toBe(QUIZZ_ID);
    });
  });

  describe(`when last question`, () => {
    const MISSION_ID = TestUtils.genMongoId();
    const QUESTION_ID_0 = TestUtils.genMongoId();
    const QUESTION_ID_1 = TestUtils.genMongoId();
    const QUESTION_ID_2 = TestUtils.genMongoId();
    const DOER_ID = TestUtils.genMongoId();
    const QUIZZ_ID = TestUtils.genMongoId();
    const MESSAGE: QuickRepliesMessageBusiness = {
      type: MessageType.QUICK_REPLIES,
      text: 'text',
      choices: [
        {
          text: ANSWER,
          score: SCORE,
        },
      ],
    };

    beforeEach(async () => {
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_ID,
          code: MISSION_CODE,
        }),
      );
      await questionRepo.save(
        QuestionFactory.create({
          id: QUESTION_ID_0,
          messages: [MESSAGE],
        }),
      );
      await quizzRepo.save(
        QuizzFactory.create({
          id: QUIZZ_ID,
          mission: MISSION_ID,
          questions: [QUESTION_ID_0],
        }),
      );
      mockDoer = await doerRepo.save(
        DoerFactory.create({
          id: DOER_ID,
        }),
      );
      await Promise.all([
        questionSheetRepo.save(
          QuestionSheetFactory.create({
            doer: DOER_ID,
            quizz: QUIZZ_ID,
            question: QUESTION_ID_1,
            score: 0,
          }),
        ),
        questionSheetRepo.save(
          QuestionSheetFactory.create({
            doer: DOER_ID,
            quizz: QUIZZ_ID,
            question: QUESTION_ID_2,
            score: 10,
          }),
        ),
      ]);

      mockAnswer = ANSWER;
      mockQuestionId = QUESTION_ID_0;
      mockFirstQuestion = 'false';
      await createApp();
    });

    it(`should redirect to outro slow`, async () => {
      await handler.handle(action, messagingPlatform);

      expect(action.followupEvent).toBe(FollowupEvents.QUIZZ_OUTRO_SLOW);
    });

    it(`should compute results`, async () => {
      await handler.handle(action, messagingPlatform);

      const quizzSheet: QuizzSheetImplBusiness = await quizzSheetRepo.findByQuizzIdAndDoerId(QUIZZ_ID, DOER_ID);
      expect(quizzSheet.completedAt).toBeTruthy();
      expect(quizzSheet.questionSheets.sort()).toEqual([QUESTION_ID_0, QUESTION_ID_1, QUESTION_ID_2].sort());
      expect(quizzSheet.score).toBe(5);
    });
  });

  describe(`when answer invalid`, () => {
    const MISSION_ID = TestUtils.genMongoId();
    const QUESTION_ID = TestUtils.genMongoId();
    const MESSAGE: QuickRepliesMessageBusiness = {
      type: MessageType.QUICK_REPLIES,
      text: 'text',
      choices: [
        {
          text: ANSWER,
          score: SCORE,
        },
      ],
    };

    beforeEach(async () => {
      await missionRepo.save(
        MissionFactory.create({
          id: MISSION_ID,
          code: MISSION_CODE,
        }),
      );
      await questionRepo.save(
        QuestionFactory.create({
          id: QUESTION_ID,
          messages: [MESSAGE],
        }),
      );
      await quizzRepo.save(
        QuizzFactory.create({
          mission: MISSION_ID,
          questions: [QUESTION_ID],
        }),
      );
      mockDoer = await doerRepo.save(DoerFactory.create());

      mockAnswer = `wrong ${ANSWER}`;
      mockQuestionId = QUESTION_ID;
      mockFirstQuestion = 'false';
      await createApp();
    });

    it(`should ask same question`, async () => {
      await handler.handle(action, messagingPlatform);

      expect(action.messages[0] instanceof TextMessageImplBusiness).toBe(true);
      expect(action.messages[1]).toEqual(MESSAGE);
      expect(mockSetContextParameter).toHaveBeenCalledWith('quizz', 'questionId', QUESTION_ID);
    });

    it(`should not save answer`, async () => {
      await handler.handle(action, messagingPlatform);

      const sheets = await questionSheetRepo.findAll();

      expect(sheets.length).toBe(0);
    });
  });

  describe(`when missing mission code`, () => {
    beforeEach(async () => {
      mockMissionCode = undefined;
      await createApp();
    });

    it(`should throw`, async () => {
      expect.assertions(1);

      try {
        await handler.handle(action, messagingPlatform);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H01000_MISSING_PARAM);
        }
      }
    });
  });

  describe(`when not first question and missing question id`, () => {
    beforeEach(async () => {
      mockFirstQuestion = 'false';
      mockQuestionId = undefined;
      await createApp();
    });

    it(`should throw`, async () => {
      expect.assertions(1);

      try {
        await handler.handle(action, messagingPlatform);
      } catch (ex: unknown) {
        if (ex instanceof BusinessError) {
          expect(ex.code).toBe(BusinessErrorCode.H01000_MISSING_PARAM);
        }
      }
    });
  });
});
