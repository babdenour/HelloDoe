import { MissionPayment, MissionPaymentUnit } from './mission-payment';

export class MissionPaymentImpl implements MissionPayment {
  private _amount: number;
  private _unit: MissionPaymentUnit;

  constructor(payment: MissionPayment) {
    this._amount = payment.amount;
    this._unit = payment.unit;
  }

  public get amount(): number {
    return this._amount;
  }

  /**
   * Set the amount in cents.
   * @param amount Amount in cents.
   */
  public setAmount(amount: number): void {
    this._amount = amount;
  }

  public get unit(): MissionPaymentUnit {
    return this._unit;
  }

  public setUnit(unit: MissionPaymentUnit): void {
    this._unit = unit;
  }

  /**
   * Get amount converted from cents.
   * @returns Whole amount.
   */
  public getWholeAmount(): number {
    return this._amount / 100;
  }

  public isPerHour(): boolean {
    return this._unit === MissionPaymentUnit.HOUR;
  }

  public isPerMission(): boolean {
    return this._unit === MissionPaymentUnit.MISSION;
  }
}
