import { BaseClient } from '@/clients/base.client';
import Config from '@/config';
import { QuizzApi } from '@api/quizz.api';
import { QuestionConverter } from '@converters/question.converter';
import { QuizzConverter } from '@converters/quizz.converter';
import { Question } from '@domains/question';
import { Quizz } from '@domains/quizz';
import { GetMissionQuizzResponse, PostMissionQuizzResponse, UpdateQuizzParams, UpdateQuizzResponse } from '@services/quizzes.service-utils';
import { TokenService } from '@services/token.service';

export class QuizzesService extends BaseClient {
  private endpointv2: string;
  private endptMission: string;

  constructor(private readonly questionCvtr: QuestionConverter, private readonly quizzCvtr: QuizzConverter, tokenSvc: TokenService) {
    super(tokenSvc);
    this.endpointv2 = Config.API_ENDPOINT_QUIZZES_V2;
    this.endptMission = Config.API_ENDPOINT_MISSIONS_V2;
  }

  public async fetchQuizzByMissionId(missionId: string): Promise<{ quizz: Quizz; questions: Question[] }> {
    const response: GetMissionQuizzResponse = await this.get<GetMissionQuizzResponse>(`${this.endptMission}${missionId}/quizz`);

    if (response.success) {
      const { quizz, questions } = response.data;

      return {
        quizz: this.quizzCvtr.toDomain(quizz),
        questions: this.questionCvtr.maptoDomain(questions),
      };
    }

    return {
      quizz: null,
      questions: [],
    };
  }

  public async createQuizzByMissionId(missionId: string): Promise<Quizz> {
    const response: PostMissionQuizzResponse = await this.post<PostMissionQuizzResponse>(`${this.endptMission}${missionId}/quizz`);

    if (response.success) {
      const quizzApi: QuizzApi = response.data;

      return this.quizzCvtr.toDomain(quizzApi);
    }

    return null;
  }

  public async updateQuizz(quizz: Quizz): Promise<{ quizz: Quizz; questions: Question[] }> {
    const response: UpdateQuizzResponse = await this.put<UpdateQuizzResponse, UpdateQuizzParams>(`${this.endpointv2}${quizz.id}`, {
      id: quizz.id,
      mission: quizz.mission,
      questions: quizz.questions,
    });

    if (response.success) {
      const { quizz, questions } = response.data;

      return {
        quizz: this.quizzCvtr.toDomain(quizz),
        questions: this.questionCvtr.maptoDomain(questions),
      };
    }

    return {
      quizz: null,
      questions: [],
    };
  }
}
