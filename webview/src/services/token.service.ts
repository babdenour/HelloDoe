import localStorage from '../utils/localStorage';

const TOKEN_KEY: string = 'token';

export class TokenService {
  public getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  };

  public setToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  };
}
