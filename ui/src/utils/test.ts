import { CandidateService } from '@services/candidate.service';
import { CheckoutService } from '@services/checkout.service';
import { I18nService } from '@services/i18n.service';
import { MissionsService } from '@services/missions.service';
import { NavigationService } from '@services/navigation.service';
import { QuestionsService } from '@services/questions.service';
import { QuizzesService } from '@services/quizzes.service';
import { TokenService } from '@services/token.service';
import { Wrapper, WrapperArray } from '@vue/test-utils';
import { Route } from 'vue-router';

export const find = (wrapper: Wrapper<Vue>, testId: string): Wrapper<Vue> => {
  return wrapper.find(`[data-test-id="${testId}"]`);
};

export const findAll = (wrapper: Wrapper<Vue>, testId: string): WrapperArray<Vue> => {
  return wrapper.findAll(`[data-test-id="${testId}"]`);
};

type MockValue<V> = V extends (...args: any[]) => any ? (...args: any[]) => ReturnType<V> : never;
type MockObject<O> = Partial<
  {
    [k in keyof O]: MockValue<O[k]>;
  }
>;

export interface Mocks {
  $candidateSvc: MockObject<CandidateService>;
  $checkoutSvc: MockObject<CheckoutService>;
  $i18nSvc: MockObject<I18nService>;
  $missionsService: MockObject<MissionsService>;
  $navigationSvc: MockObject<NavigationService>;
  $questionsService: MockObject<QuestionsService>;
  $quizzesService: MockObject<QuizzesService>;
  $route: Partial<{ [k in keyof Route] }>;
  $tokenService: MockObject<TokenService>;
}

export const getDefaultMocks = (mocks?: Partial<Mocks>): Mocks => {
  return {
    $candidateSvc: {
      fetchNextPage: mocks?.$candidateSvc?.fetchNextPage || jest.fn(),
      getList: mocks?.$candidateSvc?.getList || jest.fn().mockImplementation(() => []),
      isLastPageReached: mocks?.$candidateSvc?.isLastPageReached || jest.fn(),
      addDoerToFavorite: mocks?.$candidateSvc?.addDoerToFavorite || jest.fn(),
      removeDoerFromFavorite: mocks?.$candidateSvc?.removeDoerFromFavorite || jest.fn(),
    },
    $checkoutSvc: {
      redirectToCheckoutForMission: mocks?.$checkoutSvc?.redirectToCheckoutForMission || jest.fn(),
    },
    $i18nSvc: {
      t: (key: string) => key,
      tc: (key: string) => key,
      translateDate: (timestampMs: string) => timestampMs,
    },
    $missionsService: {
      createMissionQuizz: mocks?.$missionsService?.createMissionQuizz || jest.fn(),
      getCurrent: mocks?.$missionsService?.getCurrent || jest.fn(),
      getMissionDetails: mocks?.$missionsService?.getMissionDetails || jest.fn().mockImplementation(() => ({})),
      getMissionQuizz: mocks?.$missionsService?.getMissionQuizz || jest.fn(),
      setCurrentByCode: mocks?.$missionsService?.setCurrentByCode || jest.fn(),
      validateMission: mocks?.$missionsService?.validateMission || jest.fn(),
    },
    $navigationSvc: {
      goToClientCandidatePage: mocks?.$navigationSvc?.goToClientCandidatePage || jest.fn(),
      goToClientRecruitmentProcess: mocks?.$navigationSvc?.goToClientRecruitmentProcess || jest.fn(),
      goToClientDashboardTutorial: mocks?.$navigationSvc?.goToClientDashboardTutorial || jest.fn(),
      goToInstagram: mocks?.$navigationSvc?.goToInstagram || jest.fn(),
      goToBetaTestTypeform: mocks?.$navigationSvc?.goToBetaTestTypeform || jest.fn(),
      goToSponsoTypeform: mocks?.$navigationSvc?.goToSponsoTypeform || jest.fn(),
      goToBoostTypeform: mocks?.$navigationSvc?.goToBoostTypeform || jest.fn(),
    },
    $quizzesService: {
      updateQuizz: mocks?.$quizzesService?.updateQuizz || jest.fn(),
    },
    $questionsService: {
      createQuestion: mocks?.$questionsService?.createQuestion || jest.fn(),
      getQuestionTags: mocks?.$questionsService?.getQuestionTags || jest.fn().mockImplementation(() => []),
      getQuestionsByTag: mocks?.$questionsService?.getQuestionsByTag || jest.fn().mockImplementation(() => []),
      updateQuestion: mocks?.$questionsService?.updateQuestion || jest.fn(),
    },
    $route: {
      params: mocks?.$route?.params || {},
      query: mocks?.$route?.query || {},
    },
    $tokenService: {
      getToken: mocks?.$tokenService?.getToken || jest.fn(),
    },
  };
};
