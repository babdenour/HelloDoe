export interface ClientContactApi {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ClientApi {
  createdAt: number;
  updatedAt: number;
  id: string;
  companyName: string;
  siren: string;
  address: string;
  contact: ClientContactApi;
}
