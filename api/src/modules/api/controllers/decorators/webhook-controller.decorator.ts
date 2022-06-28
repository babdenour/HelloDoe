import { Controller as ControllerNest } from '@nestjs/common';

export const WebhookController = (path: string): ClassDecorator => {
  const prefix = 'webhook';

  return ControllerNest(`${prefix}/${path}`);
};
