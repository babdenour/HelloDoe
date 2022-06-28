import { Types } from 'mongoose';

export interface ClientContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Client {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
  companyName: string;
  siren: string;
  address: string;
  contact: ClientContact;
}
