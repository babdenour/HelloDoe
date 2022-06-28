export interface ClientContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Client {
  createdAt: number;
  updatedAt: number;
  id: string;
  companyName: string;
  siren: string;
  address: string;
  contact: ClientContact;
}
