import { Schema } from 'mongoose';

export function runValidatorsPlugin(schema: Schema): void {
  schema.pre('findOneAndUpdate', enableRunValidator);
}

function enableRunValidator(): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  this.setOptions({ runValidators: true });
}
