import { AccessControlModule } from '@api/access-control';
import { AuthModule } from '@api/auth';
import { BusinessModule } from '@business';
import { ChatbotModule } from '@chatbot';
import { HttpModule, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { StripeSdkModule } from '@sdk/stripe';
import { TokenModule } from '@token';

import { AgenciesController } from './controllers/agencies/agencies.controller';
import { AwsWebhookController } from './controllers/aws-webhook/aws-webhook.controller';
import { CandidatesController } from './controllers/candidates/candidates.controller';
import { ChatbotController } from './controllers/chatbot/chatbot.controller';
import { CheckoutController } from './controllers/checkout/checkout.controller';
import { ClientsController } from './controllers/clients/clients.controller';
import { HealthCheckController } from './controllers/health-check/health-check.controller';
import { MissionsController } from './controllers/missions/missions.controller';
import { QuestionsController } from './controllers/questions/questions.controller';
import { QuizzesController } from './controllers/quizzes/quizzes.controller';
import { StripeWebhookController } from './controllers/stripe-webhook/stripe-webhook.controller';
import { UsersController } from './controllers/users/users.controller';
import { VideoAskWebhookController } from './controllers/video-ask-webhook/video-ask-webhook.controller';
import { WebviewController } from './controllers/webview/webview.controller';
import { JsonBodyMiddleware } from './middlewares/json-body.middleware';
import { RawBodyMiddleware } from './middlewares/raw-body.middleware';

@Module({
  imports: [AccessControlModule, AuthModule, BusinessModule, ChatbotModule, HttpModule, StripeSdkModule, TokenModule],
  controllers: [
    AwsWebhookController,
    AgenciesController,
    CandidatesController,
    ChatbotController,
    CheckoutController,
    ClientsController,
    HealthCheckController,
    MissionsController,
    QuestionsController,
    QuizzesController,
    StripeWebhookController,
    UsersController,
    VideoAskWebhookController,
    WebviewController,
  ],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: '/webhook/stripe',
        method: RequestMethod.POST,
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*');
  }
}
