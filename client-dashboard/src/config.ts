export default class Config {
  private static _API_ENDPOINT: string = undefined;
  private static _NODE_ENV: string = undefined;
  private static _STRIPE_KEY: string = undefined;

  static get API_ENDPOINT_BROADCAST(): string {
    return `${this._API_ENDPOINT}broadcast/`;
  }

  static get API_ENDPOINT_CANDIDATES(): string {
    return `${this._API_ENDPOINT}v2/candidates/`;
  }

  static get API_ENDPOINT_CHECKOUT(): string {
    return `${this._API_ENDPOINT}v2/checkout/`;
  }

  static get API_ENDPOINT_CLIENTS(): string {
    return `${this._API_ENDPOINT}v2/clients/`;
  }

  static get API_ENDPOINT_DOERS(): string {
    return `${this._API_ENDPOINT}workers/`;
  }

  static get API_ENDPOINT_MISSIONS(): string {
    return `${this._API_ENDPOINT}missions/`;
  }

  static get API_ENDPOINT_WEBVIEW_V2(): string {
    return `${this._API_ENDPOINT}v2/webview/`;
  }

  static get API_ENDPOINT_AGENCIES_V2(): string {
    return `${this._API_ENDPOINT}v2/agencies/`;
  }

  static get API_ENDPOINT_MISSIONS_V2(): string {
    return `${this._API_ENDPOINT}v2/missions/`;
  }

  static get API_ENDPOINT_QUESTIONS_V2(): string {
    return `${this._API_ENDPOINT}v2/questions/`;
  }

  static get API_ENDPOINT_QUIZZES_V2(): string {
    return `${this._API_ENDPOINT}v2/quizzes/`;
  }

  static get API_ENDPOINT_USERS(): string {
    return `${this._API_ENDPOINT}users/`;
  }

  static get API_ENDPOINT_USERS_V2(): string {
    return `${this._API_ENDPOINT}v2/users/`;
  }

  static get NODE_ENV(): string {
    return this._NODE_ENV;
  }

  static get STRIPE_KEY(): string {
    return this._STRIPE_KEY;
  }

  public static loadEnvVars(): void {
    this._API_ENDPOINT = process.env.API_ENDPOINT;
    this._NODE_ENV = process.env.NODE_ENV;
    this._STRIPE_KEY = process.env.STRIPE_KEY;

    this.validateEnvVars();
  }

  private static validateEnvVars(): void {
    const envVarsMap: [string, any][] = Object.entries(this).filter((entry) => entry[0].startsWith('_'));

    envVarsMap.forEach(([varName, varValue]: [string, any]) => {
      if (varValue == null) {
        throw new Error(`could not load env var ${varName.substring(1)}`);
      }
    });
  }
}
