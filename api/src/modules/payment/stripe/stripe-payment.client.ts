import { BusinessError, BusinessErrorCode, PaymentClient, ProductIds } from '@business';
import { ConfigKeys, ConfigService } from '@config';
import { Injectable } from '@nestjs/common';
import { InjectStripeSdk } from '@sdk/stripe';
import { isEmpty, trim } from 'lodash';
import Stripe from 'stripe';

const STRIPE_METADATA_VALUE_MAX_LENGTH = 500;

@Injectable()
export class StripePaymentClient implements PaymentClient {
  constructor(private readonly configSvc: ConfigService, @InjectStripeSdk private readonly stripeSdk: Stripe) {}

  public async createCheckoutSession(
    productId: ProductIds,
    clientEmail: string,
    missionId: string,
    missionCode: string,
    doerIds: string[],
  ): Promise<{ sessionId: string }> {
    const { product, price } = await this.fetchProductByIdWithPrice(productId);

    if (!product) {
      throw new BusinessError(BusinessErrorCode.H00010_PRODUCT_NOT_FOUND, { id: productId });
    }

    const productQuantity = doerIds.length;
    const session = await this.stripeSdk.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: price.currency,
            product: product.id,
            unit_amount: price.unit_amount,
          },
          quantity: productQuantity,
        },
      ],
      customer_email: clientEmail,
      success_url: this.buildSuccessUrl(missionCode),
      cancel_url: this.buildCancelUrl(missionCode),
      metadata: {
        missionCode,
        missionId,
        ...this.buildDoerIdsMetadata(doerIds),
      },
    });

    return {
      sessionId: session.id,
    };
  }

  private buildDoerIdsMetadata(doerIds: string[]): Record<string, string> {
    const metadata = {};

    let keyIdx = 0;
    let concatenatedIds = '';
    const setDoerIdsMetadata = (metadata: Record<string, string>, keyIdx: number, value: string) => {
      const key = this.buildDoersIdKey(keyIdx);
      metadata[key] = trim(value, ',');
    };

    doerIds.forEach((doerId) => {
      const doerIdValue = this.buildDoerIdValue(doerId);
      if (concatenatedIds.length + doerIdValue.length > STRIPE_METADATA_VALUE_MAX_LENGTH) {
        setDoerIdsMetadata(metadata, keyIdx, concatenatedIds);
        concatenatedIds = '';
        keyIdx++;
      }
      concatenatedIds += doerIdValue;
    });

    setDoerIdsMetadata(metadata, keyIdx, concatenatedIds);

    return metadata;
  }

  private buildDoerIdValue(doerId: string): string {
    return `${doerId},`;
  }

  private buildDoersIdKey(keyIdx: number): string {
    return `doerIds${keyIdx}`;
  }

  private buildCancelUrl(missionCode: string): string {
    const webviewUrl: string = this.configSvc.get(ConfigKeys.APP_WEBVIEW_URL);
    return `${webviewUrl}app/checkout/failure?code=${missionCode}`;
  }

  private buildSuccessUrl(missionCode: string): string {
    const webviewUrl: string = this.configSvc.get(ConfigKeys.APP_WEBVIEW_URL);
    return `${webviewUrl}app/checkout/success?code=${missionCode}`;
  }

  private async fetchProductByIdWithPrice(
    productId: ProductIds,
  ): Promise<{ product: Stripe.Product | null; price: Stripe.Price | null }> {
    const products = await this.fetchAllProducts();
    const product = products.find((product: Stripe.Product) => product.metadata.id === productId) || null;

    if (!product) {
      return { product: null, price: null };
    }

    const prices = await this.fetchAllPricesByProductId(product.id);
    if (isEmpty(prices)) {
      return { product: null, price: null };
    }

    return { product, price: prices[0] };
  }

  private async fetchAllProducts(): Promise<Stripe.Product[]> {
    const res = await this.stripeSdk.products.list({
      limit: 100,
    });

    return res.data;
  }

  private async fetchAllPricesByProductId(productId: string): Promise<Stripe.Price[]> {
    const res = await this.stripeSdk.prices.list({
      product: productId,
    });

    return res.data;
  }
}
