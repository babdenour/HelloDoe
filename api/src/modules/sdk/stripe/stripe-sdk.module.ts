import { Module } from '@nestjs/common';

import { StripeSdkProviderFactory } from './providers';

const StripeSdkProvider = StripeSdkProviderFactory();

@Module({
  providers: [StripeSdkProvider],
  exports: [StripeSdkProvider],
})
export class StripeSdkModule {}
