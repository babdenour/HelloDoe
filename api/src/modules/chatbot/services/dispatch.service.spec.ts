import { I18nModule } from '@i18n';
import { Class } from '@modules/types';
import { Test, TestingModule } from '@nestjs/testing';

import { ChatbotModule } from '../chatbot.module';
import { ActionNames } from '../constants/action-names';
import { ServiceNames } from '../constants/service-names';
import { Action } from '../domains/action';
import { ActionHandlerNotFoundError } from '../errors/action-handler-not-found.error';
import { ApplicationProcessEnterHandler } from '../handlers/application-process-enter.handler';
import { IntentRedirectHandler } from '../handlers/intent-redirect.handler';
import { MissionGetListHandler } from '../handlers/mission-get-list.handler';
import { MissionGetMoreInfoOverviewHandler } from '../handlers/mission-get-more-info-overview.handler';
import { NewUserHandler } from '../handlers/new-user.handler';
import { PageRedirectHandler } from '../handlers/page-redirect.handler';
import { ProfileUpdateHandler } from '../handlers/profile-update.handler';
import { QuizzEnterHandler } from '../handlers/quizz-enter.handler';
import { QuizzGetAnswerHandler } from '../handlers/quizz-get-answer.handler';
import { DispatchService } from './dispatch.service';

interface HandlerDatum {
  class: Class;
  action: Action;
}

const handlerData: HandlerDatum[] = [
  {
    class: ApplicationProcessEnterHandler,
    action: { name: ActionNames.APPLICATION_PROCESS_ENTER } as Action,
  },
  {
    class: NewUserHandler,
    action: { name: ActionNames.CREATE_USER } as Action,
  },
  {
    class: IntentRedirectHandler,
    action: { name: ActionNames.INTENT_REDIRECT } as Action,
  },
  {
    class: MissionGetListHandler,
    action: { name: ActionNames.MISSION_GET_LIST } as Action,
  },
  {
    class: MissionGetMoreInfoOverviewHandler,
    action: { name: ActionNames.MISSION_GET_MORE_INFO_OVERVIEW } as Action,
  },
  {
    class: PageRedirectHandler,
    action: { name: ActionNames.PAGE_REDIRECT } as Action,
  },
  {
    class: ProfileUpdateHandler,
    action: { name: ActionNames.PROFILE_UPDATE } as Action,
  },
  {
    class: QuizzEnterHandler,
    action: { name: ActionNames.QUIZZ_ENTER } as Action,
  },
  {
    class: QuizzGetAnswerHandler,
    action: { name: ActionNames.QUIZZ_GET_ANSWER } as Action,
  },
];

describe('DispatchService', () => {
  let dispatchService: DispatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatbotModule, I18nModule],
    }).compile();

    await module.init();

    dispatchService = module.get<DispatchService>(ServiceNames.DISPATCH);
  });

  handlerData.map((datum: HandlerDatum) => {
    return describe(`when get converter for action ${datum.action.name}`, () => {
      it('should get the right converter', () => {
        const converter = dispatchService.getHandler(datum.action);

        expect(converter instanceof datum.class).toBe(true);
      });
    });
  });

  describe(`when cant find converter`, () => {
    it(`should throw ActionConverterNotFoundError`, () => {
      const unhandledAction: Action = {} as Action;

      expect(() => {
        dispatchService.getHandler(unhandledAction);
      }).toThrow(ActionHandlerNotFoundError);
    });
  });
});
