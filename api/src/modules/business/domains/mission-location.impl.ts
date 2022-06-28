import { MissionLocation } from './mission-location';

export class MissionLocationImpl implements MissionLocation {
  private _addressLine1: string;
  private _zipCode: string;

  constructor(location: MissionLocation) {
    this._addressLine1 = location.addressLine1;
    this._zipCode = location.zipCode;
  }

  public get addressLine1(): string {
    return this._addressLine1;
  }

  public setAddressLine1(addressLine1: string): void {
    this._addressLine1 = addressLine1;
  }

  public get zipCode(): string {
    return this._zipCode;
  }

  public setZipCode(zipCode: string): void {
    this._zipCode = zipCode;
  }
}
