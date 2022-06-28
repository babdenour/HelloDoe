import { RestMethods } from '@/clients/rest-methods';
import Config from '@/config';
import { QuestionConverter } from '@converters/question.converter';
import { QuizzConverter } from '@converters/quizz.converter';
import { Question } from '@domains/question';
import { Quizz } from '@domains/quizz';
import { UpdateQuizzParams, UpdateQuizzResponse } from '@services/quizzes.service-utils';
import { TokenService } from '@services/token.service';
import axios from 'axios';

export class QuizzesService {
  private endpointv2: string;

  constructor(
    private readonly questionConverter: QuestionConverter,
    private readonly quizzConverter: QuizzConverter,
    private readonly tokenService: TokenService
  ) {
    this.endpointv2 = Config.API_ENDPOINT_QUIZZES_V2;
  }

  public async updateQuizz(quizz: Quizz): Promise<{ quizz: Quizz; questions: Question[] }> {
    const body: UpdateQuizzParams = {
      id: quizz.id,
      mission: quizz.mission,
      questions: quizz.questions,
    };

    try {
      const response: UpdateQuizzResponse = await axios({
        url: `${this.endpointv2}${quizz.id}`,
        method: RestMethods.PUT,
        headers: this.buildHeaders(),
        data: JSON.stringify(body),
      });

      if (response.data.success) {
        const { quizz, questions } = response.data.data;
        return {
          quizz: this.quizzConverter.toDomain(quizz),
          questions: this.questionConverter.maptoDomain(questions),
        };
      }
    } catch (ex) {}

    return {
      quizz: null,
      questions: [],
    };
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
