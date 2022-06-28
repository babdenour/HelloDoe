import { QuestionFactory, QuestionImplBusiness } from '@business';
import { cleanDatabase, getConnection } from '@mocks/database-utils';
import { TestUtils } from '@mocks/test-utils';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { RepositoryNames } from '../constants/repository-names';
import { DatabaseModule } from '../database.module';
import { QuestionRepository } from './question.repository';

describe('QuestionRepository', () => {
  let questionRepo: QuestionRepository;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    connection = getConnection(module);
    questionRepo = module.get<QuestionRepository>(RepositoryNames.QUESTION);
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('when find by tag', () => {
    describe('if questions found', () => {
      const TAG = 'tag';
      const QUESTION_ID_0 = TestUtils.genMongoId();
      const QUESTION_ID_1 = TestUtils.genMongoId();

      beforeEach(async () => {
        await questionRepo.save(
          QuestionFactory.create({
            id: QUESTION_ID_0,
            tags: [TAG, 'other tag'],
          }),
        );
        await questionRepo.save(
          QuestionFactory.create({
            id: QUESTION_ID_1,
            tags: [TAG],
          }),
        );
        await questionRepo.save(QuestionFactory.create());
      });

      it('should return questions', async () => {
        const questions: QuestionImplBusiness[] = await questionRepo.findByTag(TAG);

        expect(questions.length).toBe(2);
        expect(questions[0].id).toBe(QUESTION_ID_0);
        expect(questions[1].id).toBe(QUESTION_ID_1);
      });
    });

    describe('if no questions', () => {
      it('should return empty array', async () => {
        const questions: QuestionImplBusiness[] = await questionRepo.findByTag('');

        expect(questions.length).toBe(0);
        expect(questions).toEqual([]);
      });
    });
  });

  describe('when find all tags', () => {
    describe('if there are tags', () => {
      const QUESTION_TAGS = [['tag0', 'tag1'], ['tag1', 'tag2'], []];

      beforeEach(async () => {
        await Promise.all(QUESTION_TAGS.map((tags: string[]) => questionRepo.save(QuestionFactory.create({ tags }))));
      });

      it('should return tags', async () => {
        const tags: string[] = await questionRepo.findAllTags();

        expect(tags.length).toBe(3);
        expect(tags).toEqual(['tag0', 'tag1', 'tag2']);
      });
    });

    describe('if no tags', () => {
      it('should return empty array', async () => {
        const tags: string[] = await questionRepo.findAllTags();

        expect(tags.length).toBe(0);
        expect(tags).toEqual([]);
      });
    });
  });
});
