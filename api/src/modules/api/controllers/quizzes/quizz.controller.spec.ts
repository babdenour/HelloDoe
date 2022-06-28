import { AUTH_ROLES_METADATA, AuthRole } from '@api/auth';
import { CreateQuizzUseCaseProviderFactory, QuizzUpdateUseCaseProviderFactory } from '@business';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenModule } from '@token';

import { QuizzesController } from './quizzes.controller';

let quizzesController: QuizzesController;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [TokenModule],
    providers: [
      CreateQuizzUseCaseProviderFactory({ useValue: {} }),
      QuizzUpdateUseCaseProviderFactory({ useValue: {} }),
      QuizzesController,
    ],
  }).compile();

  quizzesController = module.get<QuizzesController>(QuizzesController);
};

describe('QuizzesController', () => {
  beforeEach(async () => {
    await createApp();
  });

  describe('given security', () => {
    it('only admin can create quizz', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, quizzesController.createQuizz);
      expect(metadata).toEqual([AuthRole.ADMIN]);
    });

    it('only admin can update quizz', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      const metadata = Reflect.getMetadata(AUTH_ROLES_METADATA, quizzesController.updateQuizz);
      expect(metadata).toEqual([AuthRole.ADMIN]);
    });
  });
});
