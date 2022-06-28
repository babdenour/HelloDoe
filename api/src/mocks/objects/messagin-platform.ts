import { MessagingPlatform } from '../../modules/chatbot/types/messaging-platform';

export const mockMessagingPlatform = (mock?: Partial<MessagingPlatform>): MessagingPlatform => {
  return {
    getDoer: mock?.getDoer || jest.fn(),
    getDoerPlatformId: mock?.getDoerPlatformId || jest.fn(),
    getEntryPoint: mock?.getEntryPoint || jest.fn(),
    getPageId: mock?.getPageId || jest.fn(),
  } as MessagingPlatform;
};
