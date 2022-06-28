import { AgenciesService } from '@/clients/agencies.service';
import { CandidateService } from '@services/candidate.service';
import { ClientService } from '@services/client.service';
import { I18nService } from '@services/i18n.service';
import { InputValidatorService } from '@services/input-validator.service';
import { LoginService } from '@services/login.service';
import { MissionsService } from '@services/missions.service';
import { NavigationService } from '@services/navigation.service';
import { QuestionsService } from '@services/questions.service';
import { QuizzesService } from '@services/quizzes.service';
import WorkersService from '@services/workers.service';

declare module 'vue/types/vue' {
  interface Vue {
    $agenciesService: AgenciesService;
    $broadcastService: any;
    $candidateSvc: CandidateService;
    $clientSvc: ClientService;
    $i18nSvc: I18nService;
    $inputValidator: InputValidatorService;
    $loginService: LoginService;
    $missionsService: MissionsService;
    $navigationSvc: NavigationService;
    $questionsService: QuestionsService;
    $quizzesService: QuizzesService;
    $tokenService: any;
    $workersService: WorkersService;
  }
}
