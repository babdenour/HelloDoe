/* eslint-disable @typescript-eslint/no-unsafe-call */
import { customValidationErrorPlugin } from '@libs/mongoose-custom-validation-error-plugin';
import { runValidatorsPlugin } from '@libs/mongoose-run-validators-plugin';
import { Connection } from 'mongoose';

export const connectionFactory = (connection: Connection): Connection => {
  (connection as any).plugin(runValidatorsPlugin);
  (connection as any).plugin(customValidationErrorPlugin);
  return connection;
};
