export enum MissionPaymentUnit {
  HOUR = 'HOUR',
  MISSION = 'MISSION',
}

export class MissionPayment {
  readonly amount: number;
  readonly unit: MissionPaymentUnit;

  constructor(payment: MissionPayment) {
    this.amount = payment.amount;
    this.unit = payment.unit;
  }
}
