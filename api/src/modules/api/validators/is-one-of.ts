/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */

import { Class } from '@modules/types';
import { plainToClass } from 'class-transformer';
import { registerDecorator, validate, ValidationArguments, ValidationOptions } from 'class-validator';
import { flattenDeep, isEmpty } from 'lodash';

export const IsOneOf = (Classes: Class[], validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    const defaultErrorMessage = `object must be one of types ${Classes.map((c) => c.name).join(', ')}`;

    registerDecorator({
      name: 'isOneOf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [Classes],
      options: {
        message: defaultErrorMessage,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [Classes] = args.constraints;

          return Promise.all(
            Classes.map((C: Class) => {
              const instance = plainToClass(C, value);
              return validate(instance);
            }),
          )
            .then((validations: any[]) => {
              return validations.some((v) => isEmpty(flattenDeep(v)));
            })
            .catch(() => {
              return false;
            });
        },
      },
    });
  };
};
