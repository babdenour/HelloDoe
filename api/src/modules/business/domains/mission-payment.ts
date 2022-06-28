export enum MissionPaymentUnit {
  HOUR = 'HOUR',
  MISSION = 'MISSION',
}

export interface MissionPayment {
  /**
   * Amount of remuneration in cents.
   */
  amount: number;

  /**
   * Unit of payment.
   */
  unit: MissionPaymentUnit;
}
