import { ApiResponse } from '@/types/api-response';
import { MessageType } from '@/types/message-type';
import { QuestionApi, QuestionTypeApi } from '@api/question.api';
import { AxiosResponse } from 'axios';

export interface QuickReplyChoiceParams {
  text: string;
  score: number;
}

export interface ImageMessageParams {
  type: MessageType.IMAGE;
  url: string;
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

type MessageParams = ImageMessageParams | QuickRepliesMessageParams | TextMessageParams;

export interface CreateQuestionParams {
  messages: MessageParams[];
  tags: string[];
  type: QuestionTypeApi;
}
export type CreateQuestionResponse = AxiosResponse<ApiResponse<QuestionApi>>;

export interface UpdateQuestionParams {
  id: string;
  messages: MessageParams[];
  tags: string[];
  type: QuestionTypeApi;
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
