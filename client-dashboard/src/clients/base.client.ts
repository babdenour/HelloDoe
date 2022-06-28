import { RestMethods } from '@/clients/rest-methods';
import { TokenService } from '@services/token.service';
import axios, { AxiosResponse } from 'axios';

axios.defaults.validateStatus = function (status: number): boolean {
  return status < 500;
};

export class BaseClient {
  constructor(private readonly tokenSvc: TokenService) {}

  protected async get<Res>(url: string): Promise<Res> {
    const res: AxiosResponse<Res> = await axios({
      method: RestMethods.GET,
      headers: this.buildHeaders(),
      url,
    });

    return res.data;
  }

  protected async post<Res, Data = never>(url: string, data?: Data): Promise<Res> {
    const res: AxiosResponse<Res> = await axios({
      method: RestMethods.POST,
      headers: this.buildHeaders(),
      url,
      data: JSON.stringify(data),
    });

    return res.data;
  }

  protected async put<Res, Data = never>(url: string, data?: Data): Promise<Res> {
    const res: AxiosResponse<Res> = await axios({
      method: RestMethods.PUT,
      headers: this.buildHeaders(),
      url,
      data: JSON.stringify(data),
    });

    return res.data;
  }

  protected buildHeaders = (): { [k: string]: string } => {
    const token: string = this.tokenSvc.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return headers;
  };
}
