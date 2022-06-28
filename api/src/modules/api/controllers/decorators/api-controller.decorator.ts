import { Controller as ControllerNest } from '@nestjs/common';

export const ApiController = (path: string, version?: number): ClassDecorator => {
  let prefix = 'api';
  if (version) {
    prefix += `/v${version}`;
  }

  return ControllerNest(`${prefix}/${path}`);
};
