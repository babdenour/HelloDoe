import { MessageType } from '@business';
import { ArrayMinSize, Equals, IsArray, IsInt, IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator';

const QUICK_REPLY_MAX_LENGTH = 20;

class QuickReplyChoiceParams {
  @IsString()
  @IsNotEmpty()
  @MaxLength(QUICK_REPLY_MAX_LENGTH)
  readonly text: string;

  @IsString()
  readonly postback?: string;

  @IsInt()
  readonly score: number;
}

export class QuickRepliesMessageParams {
  @Equals(MessageType.QUICK_REPLIES)
  readonly type: MessageType.QUICK_REPLIES;

  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested()
  readonly choices: QuickReplyChoiceParams[];
}
