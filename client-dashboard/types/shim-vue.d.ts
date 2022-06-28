import { AgenciesService } from '@/clients/agencies.service';
import { CandidateService } from '@services/candidate.service';
import { CheckoutService } from '@services/checkout.service';
import { ClientService } from '@services/client.service';
import { I18nService } from '@services/i18n.service';
import { LoginService } from '@services/login.service';
import { MissionsService } from '@services/missions.service';
import { NavigationService } from '@services/navigation.service';
import { QuestionsService } from '@services/questions.service';
import { QuizzesService } from '@services/quizzes.service';
import { ResourceLocatorService } from '@services/resource-locator.service';
import { ToastService } from '@services/toast.service';
import WorkersService from '@services/workers.service';

declare module 'vue/types/vue' {
  interface Vue {
    $agenciesService: AgenciesService;
    $broadcastService: any;
    $checkoutSvc: CheckoutService;
    $candidateSvc: CandidateService;
    $clientSvc: ClientService;
    $i18nSvc: I18nService;
    $loginService: LoginService;
    $missionsService: MissionsService;
    $navigationSvc: NavigationService;
    $questionsService: QuestionsService;
    $quizzesService: QuizzesService;
    $resourceLocatorSvc: ResourceLocatorService;
    $toastService: ToastService;
    $tokenService: any;
    $workersService: WorkersService;
  }
}
