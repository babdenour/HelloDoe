import { Action } from '../domains/action';
import { MessagingPlatform } from './messaging-platform';

export interface ActionHandler {
  canHandle: (action: Action) => boolean;
  handle: (action: Action, messagingPlatform: MessagingPlatform) => Promise<void>;
}
