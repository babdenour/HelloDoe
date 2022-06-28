/* eslint-disable @typescript-eslint/naming-convention */

export type VideoAskEventParamsType = 'form_response_transcribed';

export type VideoAskEventParamsAnswerType = 'video';

export interface VideoAskEventParamsTranscriptionData {
  words: Array<{
    end_time: number;
    start_time: number;
    word: string;
  }>;
}

export interface VideoAskEventParamsAnswer {
  media_url: string;
  question_id: string;
  thumbnail: string;
  transcription_data: VideoAskEventParamsTranscriptionData[];
  type: VideoAskEventParamsAnswerType;
}

export interface VideoAskEventParamsQuestion {
  metadata: {
    text: string;
  };
  question_id: string;
}

export interface VideoAskEventParams {
  event_type: VideoAskEventParamsType;
  contact: {
    answers: VideoAskEventParamsAnswer[];
    variables: {
      doer_id: string;
    };
  };
  form: {
    questions: VideoAskEventParamsQuestion[];
  };
}
