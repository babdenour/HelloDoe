import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

import { ImageMessageParams } from '../../../params/image-message.params';
import { QuickRepliesMessageParams } from '../../../params/quick-replies-message.params';
import { TextMessageParams } from '../../../params/text-message.params';
import { IsOneOf } from '../../../validators/is-one-of';

export class UpdateQuestionParams {
  @IsMongoId()
  id: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tags: string[];

  @IsArray()
  @IsOneOf([ImageMessageParams, QuickRepliesMessageParams, TextMessageParams], { each: true })
  messages: (ImageMessageParams | QuickRepliesMessageParams | TextMessageParams)[];
}
