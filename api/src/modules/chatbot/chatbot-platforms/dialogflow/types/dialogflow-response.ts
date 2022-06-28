// See for messages structure: https://cloud.google.com/dialogflow/es/docs/reference/rpc/google.cloud.dialogflow.v2#google.cloud.dialogflow.v2.Intent.Message

export type ButtonPostback = {
  type: 'postback';
  title: string;
  payload: string;
};

export type ButtonWebUrl = {
  type: 'web_url';
  title: string;
  url: string;
};

export type ButtonType = ButtonPostback | ButtonWebUrl;

export type CardMessage = {
  title: string;
  subtitle: string;
  image_url: string;
  buttons: ButtonType[];
};

export type CarouselMessage = {
  payload: {
    facebook: {
      attachment: {
        type: 'template';
        payload: {
          template_type: 'generic';
          elements: CardMessage[];
        };
      };
    };
  };
};

export type ImageMessage = {
  payload: {
    facebook: {
      attachment: {
        type: 'image';
        payload: {
          url: string;
          is_reusable: true;
        };
      };
    };
  };
};

export type QuickRepliesMessage = {
  payload: {
    facebook: {
      text: string;
      quick_replies: {
        content_type: 'text';
        title: string;
        payload: string;
        image_url?: string;
      }[];
    };
  };
};

export type TextMessage = {
  payload: {
    facebook: {
      text: string;
    };
  };
};

export type FulfillmentMessages = CarouselMessage | ImageMessage | QuickRepliesMessage | TextMessage;

export interface FollowupEventInput {
  name: string;
  languageCode?: string;
  parameters?: { [k: string]: string };
}

export interface OutputContext {
  name: string;
  lifespanCount: number;
  parameters: { [k: string]: string };
}

export interface DialogflowResponse {
  fulfillmentMessages?: FulfillmentMessages[];
  followupEventInput?: FollowupEventInput;
  outputContexts?: OutputContext[];
}
