import { MessengerPayload } from '../../modules/chatbot/messaging-platforms/facebook-messenger/messenger-payload';

interface MockData {
  senderId: string;
  recipientId: string;
}

export const mockMessengerPayload = (mock?: Partial<MockData>): MessengerPayload => {
  return {
    data: {
      recipient: {
        id: mock?.recipientId ?? '1',
      },
      sender: {
        id: mock?.senderId ?? '1',
      },
    },
  } as MessengerPayload;
};
