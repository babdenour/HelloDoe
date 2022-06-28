export class MissionLocation {
  readonly addressLine1: string;
  readonly zipCode: string;

  constructor(location: MissionLocation) {
    this.addressLine1 = location.addressLine1;
    this.zipCode = location.zipCode;
  }
}
