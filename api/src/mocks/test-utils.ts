import { Class } from '@modules/types';
import { addYears, format } from 'date-fns';
import { padStart } from 'lodash';

const MONGO_ID_LENGTH = 24;

export class TestUtils {
  private static count = 0;

  static genMongoId(): string {
    const mongoId = padStart(this.count.toString(), MONGO_ID_LENGTH, '0');
    this.count++;

    return mongoId;
  }

  /**
   * Format a birthday date given an age.
   * @example <caption>Returned format for 10th of May 2021:</caption>
   * "2021-05-10"
   * @param age
   */
  static formatBirthdayDate(age: number): string {
    return format(addYears(Date.now(), -age), 'yyyy-MM-dd');
  }
}

export type ClassMock<T> = Record<keyof T, typeof jest.fn>;

export const mockClass = <T>(c: Class<T>): ClassMock<T> => {
  const props = Object.getOwnPropertyNames(c.prototype);

  const mock: ClassMock<T> = {} as ClassMock<T>;
  props.forEach((prop: string) => {
    Object.defineProperty(mock, prop, {
      enumerable: true,
      writable: true,
      value: jest.fn(),
    });
  });

  return mock;
};
