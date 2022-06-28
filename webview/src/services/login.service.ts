import { RestMethods } from '@/clients/rest-methods';
import Config from '@/config';
import ErrorKeys from '@constants/ErrorKeys';
import {
  LoginClientParams,
  LoginClientRes,
  LoginParams,
  LoginResponse,
} from '@services/login.service-utils';
import { TokenService } from '@services/token.service';
import axios from 'axios';

export class LoginService {
  endpoint: string;
  endpointV2: string;

  constructor(private readonly tokenSvc: TokenService) {
    this.endpoint = Config.API_ENDPOINT_USERS;
    this.endpointV2 = Config.API_ENDPOINT_USERS_V2;
  }

  public async login(username: string, password: string): Promise<void> {
    const params: LoginParams = { username, password };
    const response: LoginResponse = await axios({
      url: `${this.endpoint}login`,
      method: RestMethods.POST,
      headers: this.buildHeaders(),
      data: JSON.stringify(params),
    });

    if (!response.data.success) {
      throw new Error(ErrorKeys.NOT_SPECIFIED);
    }

    this.tokenSvc.setToken(response.data.token);
  }

  public async loginClient(email: string, missionCode: string): Promise<void> {
    const params: LoginClientParams = { email, missionCode };
    const response: LoginClientRes = await axios({
      url: `${this.endpointV2}client/auth`,
      method: RestMethods.POST,
      headers: this.buildHeaders(),
      data: JSON.stringify(params),
    });

    if (!response.data.success) {
      throw new Error(ErrorKeys.NOT_SPECIFIED);
    }

    this.tokenSvc.setToken(response.data.data.token);
  }

  private buildHeaders = (): { [k: string]: string } => {
    const headers = { 'Content-Type': 'application/json' };
    return headers;
  };
}
