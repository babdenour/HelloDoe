import { Provider } from '@nestjs/common';

import { Class } from './types';
import { PartialDeep } from './types/partial-deep';

type UseFactory<T> = {
  factory: (...args: any[]) => T;
  inject: Class[];
};

type Options<T> = {
  useValue?: PartialDeep<T>;
  useClass?: Class<T>;
  useFactory?: UseFactory<T>;
};

export class ProviderFactory {
  public static createFactory<T>(name: string, createOptions?: Options<T>) {
    return (options: Options<T> = createOptions): Provider => {
      if (options.useValue) {
        return {
          provide: name,
          useValue: options.useValue,
        };
      } else if (options.useClass) {
        return {
          provide: name,
          useClass: options.useClass,
        };
      } else if (isFactoryValid(options.useFactory)) {
        return {
          provide: name,
          useFactory: options.useFactory.factory,
          inject: options.useFactory.inject,
        };
      }

      throw new Error(`Could not create factory for ${name}`);
    };
  }
}

function isFactoryValid<T>(useFactory: UseFactory<T>): boolean {
  return !!useFactory && !!useFactory.factory && !!useFactory.inject;
}
