import { ROUTE_NAMES } from '@/route-names';
import VueRouter from 'vue-router';

export interface NavigationOptions {
  hash: string;
}

export enum NavigationListCandidateHash {
  UNLOCKED = 'unlocked',
  FAVORITE = 'favorite',
  SUGGESTED = 'suggested',
  OTHERS = 'others',
}

export class NavigationService {
  constructor(private readonly router: VueRouter) {}

  public goToClientCandidatePage = (missionCode: string, options?: NavigationOptions): void => {
    this.router.push({
      name: ROUTE_NAMES.CLIENT_CANDIDATES_PAGE,
      params: { missionCode },
      hash: options?.hash ? `#${options.hash}` : '',
    });
  };

  public goToClientRecruitmentProcess = (missionCode: string): void => {
    this.router.push({
      name: ROUTE_NAMES.CLIENT_RECRUITMENT_PROCESS_PAGE,
      params: { missionCode },
    });
  };

  public goToClientDashboardTutorial = (missionCode: string): void => {
    this.router.push({
      name: ROUTE_NAMES.CLIENT_DASHBOARD_TUTORIAL_PAGE,
      params: { missionCode },
    });
  };

  public goToClientFaq = (missionCode: string): void => {
    this.router.push({
      name: ROUTE_NAMES.CLIENT_FAQ_PAGE,
      params: { missionCode },
    });
  };

  public goToInstagram = (): void => {
    window.open('https://www.instagram.com/hellodoe_/', '_blank');
  };

  public goToBetaTestTypeform = (): void => {
    window.open('https://hellodoe.typeform.com/to/eHyJyi7E', '_blank');
  };

  public goToSponsoTypeform = (missionCode: string, firstName: string, email: string): void => {
    window.open(`https://hellodoe.typeform.com/to/IYc8o9Cp#id=${missionCode}&first_name=${firstName}&email=${email}`, '_blank');
  };

  public goToBoostTypeform = (missionCode: string, firstName: string, email: string): void => {
    window.open(`https://hellodoe.typeform.com/to/h90HHrIF#id=${missionCode}&first_name=${firstName}&email=${email}`, '_blank');
  };

  public goToPublishNewMissionTypeform = (): void => {
    window.open('https://hellodoe.typeform.com/to/S4e6Zo', '_blank');
  };
}
