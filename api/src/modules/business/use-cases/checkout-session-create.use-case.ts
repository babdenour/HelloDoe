import {
  InjectMissionRepository,
  InjectQuizzRepository,
  InjectQuizzSheetRepository,
  MissionRepository,
  QuizzRepository,
} from '@database';
import { Injectable } from '@nestjs/common';
import { InjectPaymentClient } from '@payment';

import { ClientImpl } from '../domains/client.impl';
import { MissionImpl } from '../domains/mission.impl';
import { QuizzImpl } from '../domains/quizz/quizz.impl';
import { PaymentClient } from '../interfaces/payment/payment.client';
import { ProductIds } from '../interfaces/payment/product-ids';
import { QuizzSheetRepository } from '../repositories/quizz-sheet.repository';

@Injectable()
export class CheckoutSessionCreateUseCase {
  constructor(
    @InjectMissionRepository private readonly missionRepo: MissionRepository,
    @InjectPaymentClient private readonly paymentClt: PaymentClient,
    @InjectQuizzRepository private readonly quizzRepo: QuizzRepository,
    @InjectQuizzSheetRepository private readonly quizzShtRepo: QuizzSheetRepository,
  ) {}

  public async run(productId: ProductIds, missionId: string): Promise<{ sessionId: string }> {
    const findingMission = this.missionRepo.findByIdWithClient(missionId);
    const findingQuizz = this.quizzRepo.findByMissionId(missionId);

    const mission: MissionImpl<ClientImpl> = (await findingMission) as MissionImpl<ClientImpl>;
    const quizz: QuizzImpl = await findingQuizz;

    const candidates = await this.quizzShtRepo.findAllByQuizzIdAndIsFavorite(quizz.id, true);

    const clientEmail = mission.client.contact.email;
    const doerIds = candidates.map((candidate) => candidate.doer);

    const { sessionId } = await this.paymentClt.createCheckoutSession(
      productId,
      clientEmail,
      mission.id,
      mission.code,
      doerIds,
    );

    return { sessionId };
  }
}
