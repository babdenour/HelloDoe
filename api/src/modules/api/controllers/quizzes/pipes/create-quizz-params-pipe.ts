import { Injectable, PipeTransform } from '@nestjs/common';
import { QuizzFactory, QuizzImplBusiness } from '@business';

import { CreateQuizzParams } from '../params/create-quizz.params';

export type CreateQuizzParamsPiped = QuizzImplBusiness;

@Injectable()
export class CreateQuizzParamsPipe implements PipeTransform<CreateQuizzParams, CreateQuizzParamsPiped> {
  public transform(value: CreateQuizzParams): CreateQuizzParamsPiped {
    return QuizzFactory.create({
      mission: value.missionId,
    });
  }
}
