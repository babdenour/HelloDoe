export type MessengerPayload = {
  data: {
    sender: {
      id: string;
    };
    recipient: {
      id: string;
    };
    timestamp: string;
  };
};
