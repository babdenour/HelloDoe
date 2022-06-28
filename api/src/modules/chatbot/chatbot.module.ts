import { BusinessModule } from '@business';
import { ConfigModule } from '@config';
import { DatabaseModule } from '@database';
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { ApplicationProcessEnterHandler } from './handlers/application-process-enter.handler';
import { IntentRedirectHandler } from './handlers/intent-redirect.handler';
import { MissionGetListHandler } from './handlers/mission-get-list.handler';
import { MissionGetMoreInfoOverviewHandler } from './handlers/mission-get-more-info-overview.handler';
import { MissionGetMoreInfoTasksHandler } from './handlers/mission-get-more-info-tasks.handler';
import { NewUserHandler } from './handlers/new-user.handler';
import { PageRedirectHandler } from './handlers/page-redirect.handler';
import { ProfileUpdateHandler } from './handlers/profile-update.handler';
import { QuizzEnterHandler } from './handlers/quizz-enter.handler';
import { QuizzGetAnswerHandler } from './handlers/quizz-get-answer.handler';
import { ChatbotConnectorProvider, DispatchServiceProvider, RequestParserProvider } from './providers';
import { ButtonPostbackServiceProviderFactory } from './services/button-postback.service';

const ButtonPostbackServiceProvider = ButtonPostbackServiceProviderFactory();

@Module({
  imports: [BusinessModule, ConfigModule, DatabaseModule, DiscoveryModule],
  providers: [
    ButtonPostbackServiceProvider,
    ChatbotConnectorProvider,
    DispatchServiceProvider,
    RequestParserProvider,

    // Handlers
    ApplicationProcessEnterHandler,
    IntentRedirectHandler,
    MissionGetListHandler,
    MissionGetMoreInfoOverviewHandler,
    MissionGetMoreInfoTasksHandler,
    NewUserHandler,
    PageRedirectHandler,
    ProfileUpdateHandler,
    QuizzEnterHandler,
    QuizzGetAnswerHandler,
  ],
  exports: [ChatbotConnectorProvider],
})
export class ChatbotModule {}
