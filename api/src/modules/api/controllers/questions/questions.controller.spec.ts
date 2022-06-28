import { AUTH_ROLES_METADATA, AuthRole } from '@api/auth';
import { QuestionServiceProviderFactory } from '@business';
import { QuestionRepositoryProviderFactory } from '@database';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenModule } from '@token';

import { QuestionsController } from './questions.controller';

let questionsController: QuestionsController;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [TokenModule],
    providers: [
      QuestionsController,
      QuestionRepositoryProviderFactory({ useValue: {} }),
      QuestionServiceProviderFactory({ useValue: {} }),
    ],
  }).compile();

  questionsController = module.get<QuestionsController>(QuestionsController);
};

describe('QuestionsController', () => {
  beforeEach(async () => {
    await createApp();
  });

  describe('given security', () => {
    it('only admin can create question', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, questionsController.createQuestion);

      expect(metadata).toEqual([AuthRole.ADMIN]);
    });

    it('only admin can update question', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, questionsController.updateQuestion);

      expect(metadata).toEqual([AuthRole.ADMIN]);
    });

    it('only admin can get questions by tags', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, questionsController.getQuestionsByTag);

      expect(metadata).toEqual([AuthRole.ADMIN]);
    });

    it('only admin can get all question tags', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, questionsController.getAllQuestionTags);

      expect(metadata).toEqual([AuthRole.ADMIN]);
    });
  });
});
