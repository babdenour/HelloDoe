import { Action } from '../domains/action';
import { MessagingPlatform } from './messaging-platform';

export interface ActionDispatcher {
  dispatchAction: (action: Action, messagingPlatform: MessagingPlatform) => Promise<void>;
}
