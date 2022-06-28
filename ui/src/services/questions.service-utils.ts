import { ApiResponse } from '@/types/api-response';
import { MessageType } from '@/types/message-type';
import { QuestionApi } from '@api/question.api';
import { AxiosResponse } from 'axios';

export interface QuickReplyChoiceParams {
  text: string;
  score: number;
}

export interface QuickRepliesMessageParams {
  type: MessageType.QUICK_REPLIES;
  text: string;
  choices: QuickReplyChoiceParams[];
}

export interface TextMessageParams {
  type: MessageType.TEXT;
  text: string;
}

export interface CreateQuestionParams {
  messages: (QuickRepliesMessageParams | TextMessageParams)[];
  tags: string[];
}
export type CreateQuestionResponse = AxiosResponse<ApiResponse<QuestionApi>>;

export interface UpdateQuestionParams {
  id: string;
  messages: (QuickRepliesMessageParams | TextMessageParams)[];
  tags: string[];
}
export type UpdateQuestionResponse = AxiosResponse<ApiResponse<QuestionApi>>;

export type GetByTagResponse = AxiosResponse<
  ApiResponse<{
    questions: QuestionApi[];
    page: number;
    pageCount: number;
  }>
>;

export type GetAllTagsResponse = AxiosResponse<
  ApiResponse<{
    tags: string[];
  }>
>;
