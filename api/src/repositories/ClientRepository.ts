import * as ClientModel from "../models/Client";
import { ClientInterface } from "../types";

// TODO: remove hack
const Client = ClientModel as any;

interface IClientInfo {
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  siren: string;
}

export class ClientRepository {
  /**
   * Find or create a client by their company name.
   * @param companyName
   * @param clientInfo
   * @returns Promise object represents a client.
   */
  public async findOneOrCreateByCompanyName(
    companyName: string,
    { address, email, firstName, lastName, phone, siren }: IClientInfo
  ): Promise<ClientInterface> {
    let client = await Client.findOne({ companyName }).exec();

    if (client === null) {
      client = new Client();
      client.setClientInfos({
        companyName: companyName,
        address,
        siren,
        contact: {
          firstName,
          lastName,
          phone,
          email
        }
      });
      await client.save();
    }

    return (client as unknown) as ClientInterface;
  }
}
