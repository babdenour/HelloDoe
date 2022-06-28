import { MessageType } from '@business';
import { Equals, IsNotEmpty, IsUrl } from 'class-validator';

export class ImageMessageParams {
  @Equals(MessageType.IMAGE)
  readonly type: MessageType.IMAGE;

  @IsUrl()
  @IsNotEmpty()
  readonly url: string;
}
