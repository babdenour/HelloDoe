import { MessageType } from '@business';
import { Equals, IsNotEmpty, IsString } from 'class-validator';

export class TextMessageParams {
  @Equals(MessageType.TEXT)
  readonly type: MessageType.TEXT;

  @IsString()
  @IsNotEmpty()
  readonly text: string;
}
