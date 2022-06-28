import { QuizzImplBusiness } from '@business';

import { QuizzDto } from '../dtos/quizz.dto';

export class QuizzAdapter {
  public static toApi = (quizz: QuizzImplBusiness): QuizzDto => {
    return new QuizzDto({
      createdAt: quizz?.createdAt,
      updatedAt: quizz?.updatedAt,
      id: quizz?.id,
      mission: quizz?.mission,
      questions: quizz?.questions,
    });
  };
}
