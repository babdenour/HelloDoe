import { IsBoolean } from 'class-validator';

export class SetDoerFavoriteParams {
  @IsBoolean()
  isFavorite: boolean;
}
