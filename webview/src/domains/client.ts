export interface ClientContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class Client {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  readonly companyName: string;
  readonly siren: string;
  readonly address: string;
  readonly contact: ClientContact;

  constructor(client: Client) {
    this.createdAt = client.createdAt;
    this.updatedAt = client.updatedAt;
    this.id = client.id;
    this.companyName = client.companyName;
    this.siren = client.siren;
    this.address = client.address;
    this.contact = client.contact;
  }
}
