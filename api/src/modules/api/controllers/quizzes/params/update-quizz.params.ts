import { IsArray, IsMongoId } from 'class-validator';

export class UpdateQuizzParams {
  @IsMongoId()
  id: string;

  @IsMongoId()
  mission: string;

  @IsArray()
  @IsMongoId({ each: true })
  questions: string[];
}
