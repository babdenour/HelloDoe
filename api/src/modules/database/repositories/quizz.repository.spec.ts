import { QuestionFactory, QuestionImplBusiness, QuizzFactory, QuizzImplBusiness } from '@business';
import { cleanDatabase, getConnection } from '@mocks/database-utils';
import { TestUtils } from '@mocks/test-utils';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { RepositoryNames } from '../constants/repository-names';
import { DatabaseModule } from '../database.module';
import { QuestionRepository } from './question.repository';
import { QuizzRepository } from './quizz.repository';

describe('QuizzRepository', () => {
  let questionRepo: QuestionRepository;
  let quizzRepo: QuizzRepository;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    connection = getConnection(module);
    questionRepo = module.get<QuestionRepository>(RepositoryNames.QUESTION);
    quizzRepo = module.get<QuizzRepository>(RepositoryNames.QUIZZ);
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('when find quizz by id with questions', () => {
    describe('if exists and has questions', () => {
      const QUIZZ_ID = TestUtils.genMongoId();
      const QUESTION_IDS = [TestUtils.genMongoId(), TestUtils.genMongoId()];

      beforeEach(async () => {
        await Promise.all(
          QUESTION_IDS.map((id: string, idx: number) =>
            questionRepo.save(
              QuestionFactory.create({
                id,
                tags: [`tag${idx}`],
              }),
            ),
          ),
        );
        await quizzRepo.save(QuizzFactory.create({ id: QUIZZ_ID, questions: QUESTION_IDS }));
      });

      it('should return quizz with questions', async () => {
        const { quizz, questions } = await quizzRepo.findByIdWithQuestions(QUIZZ_ID);

        expect(quizz.id).toBe(QUIZZ_ID);
        expect(questions.length).toBe(2);
        expect(questions[0] instanceof QuestionImplBusiness).toBe(true);
        expect(questions[0].tags).toEqual(['tag0']);
        expect(questions[1].tags).toEqual(['tag1']);
      });
    });

    describe('if does not find', () => {
      const WRONG_QUIZZ_ID = TestUtils.genMongoId();

      it('should return quizz null and empty question array', async () => {
        const { quizz, questions } = await quizzRepo.findByIdWithQuestions(WRONG_QUIZZ_ID);

        expect(quizz).toBe(null);
        expect(questions).toEqual([]);
      });
    });
  });

  describe('when find quizz by mission id with questions', () => {
    describe('if exists and has questions', () => {
      const MISSION_ID = TestUtils.genMongoId();
      const QUESTION_IDS = [TestUtils.genMongoId(), TestUtils.genMongoId()];

      beforeEach(async () => {
        await Promise.all(
          QUESTION_IDS.map((id: string, idx: number) =>
            questionRepo.save(
              QuestionFactory.create({
                id,
                tags: [`tag${idx}`],
              }),
            ),
          ),
        );
        await quizzRepo.save(QuizzFactory.create({ mission: MISSION_ID, questions: QUESTION_IDS }));
      });

      it('should return quizz with questions', async () => {
        const { quizz, questions } = await quizzRepo.findByMissionIdWithQuestions(MISSION_ID);

        expect(quizz.mission).toBe(MISSION_ID);
        expect(questions.length).toBe(2);
        expect(questions[0] instanceof QuestionImplBusiness).toBe(true);
        expect(questions[0].tags).toEqual(['tag0']);
        expect(questions[1].tags).toEqual(['tag1']);
      });
    });

    describe('if does not find', () => {
      const WRONG_MISSION_ID = TestUtils.genMongoId();

      it('should return quizz null and empty question array', async () => {
        const { quizz, questions } = await quizzRepo.findByMissionIdWithQuestions(WRONG_MISSION_ID);

        expect(quizz).toBe(null);
        expect(questions).toEqual([]);
      });
    });
  });

  describe('when find quizz by mission id', () => {
    describe('if exists', () => {
      const MISSION_ID = TestUtils.genMongoId();

      beforeEach(async () => {
        await quizzRepo.save(QuizzFactory.create({ mission: MISSION_ID }));
      });

      it('should return quizz', async () => {
        const quizz = await quizzRepo.findByMissionId(MISSION_ID);

        expect(quizz instanceof QuizzImplBusiness).toBe(true);
        expect(quizz.mission).toBe(MISSION_ID);
      });
    });

    describe('if does not exist', () => {
      const WRONG_MISSION_ID = TestUtils.genMongoId();

      it('should return null', async () => {
        const quizz = await quizzRepo.findByMissionId(WRONG_MISSION_ID);

        expect(quizz).toBe(null);
      });
    });
  });
});
