import { ButtonPostbackService } from '@chatbot/services/button-postback.service';

export const mockButtonPostbackSvc = (mock?: Partial<ButtonPostbackService>): Partial<ButtonPostbackService> => {
  return {
    buildGetMoreInfoAboutMissionPostback:
      mock?.buildGetMoreInfoAboutMissionPostback || jest.fn().mockImplementation((key: string) => key),
    buildGetMoreInfoAboutMissionTasksPostback:
      mock?.buildGetMoreInfoAboutMissionTasksPostback || jest.fn().mockImplementation((key: string) => key),
    buildGetNextMissionsPostback:
      mock?.buildGetNextMissionsPostback || jest.fn().mockImplementation((key: string) => key),
    buildQuizzEnterPostback: mock?.buildQuizzEnterPostback || jest.fn().mockImplementation((key: string) => key),
  };
};
