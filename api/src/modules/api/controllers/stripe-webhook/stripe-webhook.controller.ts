import { CheckoutFulfillUnlockDoersUseCase, InjectCheckoutFulfillUnlockDoersUseCase } from '@business';
import { ConfigKeys, ConfigService } from '@config';
import { BadRequestException, Post, Req, UseFilters, UsePipes } from '@nestjs/common';
import { InjectStripeSdk } from '@sdk/stripe';
import { Request as RequestExpress } from 'express';
import Stripe from 'stripe';

import { LoggingExceptionFilter } from '../../filters/logging-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { WebhookController } from '../decorators/webhook-controller.decorator';
import { EventNames } from './event-names';
import { RequestBody } from './request-body';

@UseFilters(new LoggingExceptionFilter())
@UsePipes(ValidationPipe())
@WebhookController('stripe')
export class StripeWebhookController {
  constructor(
    private readonly configSvc: ConfigService,
    @InjectCheckoutFulfillUnlockDoersUseCase
    private readonly checktFulfillUnlockDoers: CheckoutFulfillUnlockDoersUseCase,
    @InjectStripeSdk private readonly stripeSdk: Stripe,
  ) {}

  @Post()
  async handleRequest(@Req() req: RequestExpress): Promise<void> {
    const event = this.validateAndBuildWebhookEvent(req);

    if (event.type === EventNames.CHECKOUT_SESSION_COMPLETED) {
      await this.handleCheckoutSessionCompleted((event as unknown) as RequestBody);
    }
  }

  private async handleCheckoutSessionCompleted(body: RequestBody): Promise<void> {
    const missionId = body.data.object.metadata.missionId;
    const doerIds = this.extractDoerIdsFromMetadata(body.data.object.metadata);

    await this.checktFulfillUnlockDoers.run(missionId, doerIds);
  }

  private extractDoerIdsFromMetadata(metadata: Record<string, string>): string[] {
    let doerIds: string[] = [];

    const buildKey = (idx: number) => `doerIds${idx}`;
    let keyIdx = 0;
    let key = buildKey(keyIdx);

    while (metadata[key]) {
      doerIds = doerIds.concat(metadata[key].split(','));
      keyIdx++;
      key = buildKey(keyIdx);
    }

    return doerIds;
  }

  private validateAndBuildWebhookEvent(req: RequestExpress): Stripe.Event {
    try {
      const ENDPOINT_SECRET = this.configSvc.get<string>(ConfigKeys.STRIPE_ENDPOINT_SECRET);
      const signature = req.headers['stripe-signature'];
      return this.stripeSdk.webhooks.constructEvent(req.body, signature, ENDPOINT_SECRET);
    } catch (ex) {
      throw new BadRequestException(ex.message);
    }
  }
}
