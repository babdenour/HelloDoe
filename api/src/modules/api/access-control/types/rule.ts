export interface Rule {
  own(data?: any): boolean | Promise<boolean>;
  any(data?: any): boolean | Promise<boolean>;
}
