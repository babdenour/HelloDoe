import { IsBoolean } from 'class-validator';

export class SetCandidateFavoriteParams {
  @IsBoolean()
  isFavorite: boolean;
}
