import { ImageMessage } from '@domains/image-message';
import { QuickRepliesMessage } from '@domains/quick-replies-message';
import { TextMessage } from '@domains/text-message';

export type QuestionMessage = ImageMessage | QuickRepliesMessage | TextMessage;
