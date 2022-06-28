import { RestMethods } from '@/clients/rest-methods';
import Config from '@/config';
import { QuestionApi } from '@api/question.api';
import { QuestionConverter } from '@converters/question.converter';
import { Question } from '@domains/question';
import {
  CreateQuestionParams,
  CreateQuestionResponse,
  GetAllTagsResponse,
  GetByTagResponse,
  UpdateQuestionParams,
  UpdateQuestionResponse,
} from '@services/questions.service-utils';
import { TokenService } from '@services/token.service';
import axios from 'axios';

export class QuestionsService {
  private endpointv2: string;

  constructor(
    private readonly questionConverter: QuestionConverter,
    private readonly tokenService: TokenService
  ) {
    this.endpointv2 = Config.API_ENDPOINT_QUESTIONS_V2;
  }

  public async createQuestion(question: Question): Promise<Question> {
    const body: CreateQuestionParams = {
      messages: question.messages,
      tags: question.tags,
    };

    try {
      const response: CreateQuestionResponse = await axios({
        url: `${this.endpointv2}`,
        method: RestMethods.POST,
        headers: this.buildHeaders(),
        data: JSON.stringify(body),
      });

      if (response.data.success) {
        const questionApi: QuestionApi = response.data.data;
        return this.questionConverter.toDomain(questionApi);
      }
    } catch (ex) {}

    return null;
  }

  public async updateQuestion(question: Question): Promise<Question> {
    const body: UpdateQuestionParams = {
      id: question.id,
      messages: question.messages,
      tags: question.tags,
    };

    try {
      const response: UpdateQuestionResponse = await axios({
        url: `${this.endpointv2}`,
        method: RestMethods.PUT,
        headers: this.buildHeaders(),
        data: JSON.stringify(body),
      });

      if (response.data.success) {
        const questionApi: QuestionApi = response.data.data;
        return this.questionConverter.toDomain(questionApi);
      }
    } catch (ex) {}

    return null;
  }

  public async getQuestionsByTag(tag: string): Promise<Question[]> {
    try {
      const response: GetByTagResponse = await axios({
        url: `${this.endpointv2}tags/${tag}`,
        method: RestMethods.GET,
        headers: this.buildHeaders(),
      });

      if (response.data.success) {
        return this.questionConverter.maptoDomain(response.data.data.questions);
      }
    } catch (ex) {}

    return [];
  }

  public async getQuestionTags(): Promise<string[]> {
    try {
      const response: GetAllTagsResponse = await axios({
        url: `${this.endpointv2}tags`,
        method: RestMethods.GET,
        headers: this.buildHeaders(),
      });

      if (response.data.success) {
        return response.data.data.tags;
      }
    } catch (ex) {}

    return [];
  }

  private buildHeaders = (): { [k: string]: string } => {
    const token: string = this.tokenService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return headers;
  };
}
