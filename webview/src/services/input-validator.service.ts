import trim from 'lodash/trim';

export class InputValidatorService {
  private readonly emailRegex = /^[-_.A-Za-z0-9]+@[-_.A-Za-z0-9]+\.[-_.A-Za-z0-9]+$/;

  private readonly phoneRegex = /^(\+33|0)([-.\s]*[0-9]){9}$/;

  public isStringBlank = (str: string): boolean => {
    const trimmedStr = trim(str);
    return !trimmedStr || trimmedStr.length === 0;
  };

  public isStringSet = (str: string): boolean => {
    return !this.isStringBlank(str);
  };

  public isNumberMin = (min: number): ((value: string) => boolean) => {
    return (value: string): boolean => {
      const intValue = parseInt(value, 10);
      return intValue >= min;
    };
  };

  public isEmailValid = (email: string): boolean => {
    return this.emailRegex.test(email);
  };

  public isPhoneValid = (phone: string): boolean => {
    return this.phoneRegex.test(phone);
  };
}
