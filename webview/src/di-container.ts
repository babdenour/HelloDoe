import { AgenciesService } from '@/clients/agencies.service';
import { CandidateClient } from '@/clients/candidate.client';
import { ClientClient } from '@/clients/client.client';
import { MissionClient } from '@/clients/mission.client';
import { i18n } from '@/i18n';
import { AgencyConverter } from '@converters/agency.converter';
import { CandidateConverter } from '@converters/candidate.converter';
import { ClientConverter } from '@converters/client.converter';
import { MessagesConverter } from '@converters/messages.converter';
import { MissionConverter } from '@converters/mission.converter';
import { QuestionConverter } from '@converters/question.converter';
import { QuizzConverter } from '@converters/quizz.converter';
import { TimeTableConverter } from '@converters/time-table.converter';
import BroadcastService from '@services/broadcast.service';
import { CandidateService } from '@services/candidate.service';
import { ClientService } from '@services/client.service';
import { I18nService } from '@services/i18n.service';
import { InputValidatorService } from '@services/input-validator.service';
import { LoginService } from '@services/login.service';
import { MissionsService } from '@services/missions.service';
import { NavigationService } from '@services/navigation.service';
import { QuestionsService } from '@services/questions.service';
import { QuizzesService } from '@services/quizzes.service';
import { TokenService } from '@services/token.service';
import WorkersService from '@services/workers.service';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';

export interface DiContainer {
  // Clients
  candidateClt: CandidateClient;
  missionClt: MissionClient;

  // Converters
  agenciesCvtr: AgencyConverter;
  candidateCvtr: CandidateConverter;
  messagesCvtr: MessagesConverter;
  questionCvtr: QuestionConverter;
  quizzCvtr: QuizzConverter;

  // Services
  agencySvc: AgenciesService;
  broadcastSvc: BroadcastService;
  candidateSvc: CandidateService;
  clientSvc: ClientService;
  i18nSvc: I18nService;
  loginSvc: LoginService;
  missionsSvc: MissionsService;
  navigationSvc: NavigationService;
  questionsSvc: QuestionsService;
  quizzesSvc: QuizzesService;
  tokenSvc: TokenService;
  workersSvc: WorkersService;

  // Validators
  inputValidator: InputValidatorService;
}

let container: DiContainer;

export const createContainer = (router: VueRouter, vueI18n: VueI18n): void => {
  const tokenSvc: TokenService = new TokenService();

  const agenciesCvtr: AgencyConverter = new AgencyConverter();
  const candidateCvtr: CandidateConverter = new CandidateConverter();
  const clientCvtr: ClientConverter = new ClientConverter();
  const messagesCvtr: MessagesConverter = new MessagesConverter();
  const timeTableCvtr: TimeTableConverter = new TimeTableConverter();
  const missionCvtr: MissionConverter = new MissionConverter(timeTableCvtr);
  const questionCvtr: QuestionConverter = new QuestionConverter(messagesCvtr);
  const quizzCvtr: QuizzConverter = new QuizzConverter();

  const candidateClt: CandidateClient = new CandidateClient(candidateCvtr, tokenSvc);
  const clientClt: ClientClient = new ClientClient(clientCvtr, tokenSvc);
  const missionClt: MissionClient = new MissionClient(missionCvtr, tokenSvc);

  const broadcastSvc: BroadcastService = new BroadcastService();
  const candidateSvc: CandidateService = new CandidateService(candidateClt);
  const clientSvc: ClientService = new ClientService(clientClt);
  const i18nSvc: I18nService = new I18nService(vueI18n);
  const workersSvc: WorkersService = new WorkersService();
  const agencySvc: AgenciesService = new AgenciesService(agenciesCvtr, tokenSvc);
  const missionsSvc: MissionsService = new MissionsService(missionCvtr, i18n, tokenSvc);
  const navigationSvc: NavigationService = new NavigationService(router);
  const loginSvc: LoginService = new LoginService(tokenSvc);
  const questionsSvc: QuestionsService = new QuestionsService(questionCvtr, tokenSvc);
  const quizzesSvc: QuizzesService = new QuizzesService(questionCvtr, quizzCvtr, tokenSvc);

  const inputValidator: InputValidatorService = new InputValidatorService();

  container = {
    // Clients
    candidateClt,
    missionClt,

    // Converters
    agenciesCvtr,
    candidateCvtr,
    messagesCvtr,
    questionCvtr,
    quizzCvtr,

    // Services
    agencySvc,
    broadcastSvc,
    candidateSvc,
    clientSvc,
    i18nSvc,
    loginSvc,
    missionsSvc,
    navigationSvc,
    questionsSvc,
    quizzesSvc,
    tokenSvc,
    workersSvc,

    // Validators
    inputValidator,
  };
};

export const getContainer = (): DiContainer => {
  if (!container) {
    throw new Error('The dependency injection container is being used before being initialised');
  }

  return container;
};
