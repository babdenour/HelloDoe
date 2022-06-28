import { BusinessModule } from '@business';
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { AccessControlServiceProviderFactory } from './access-control.service';
import { CandidatesReadRule } from './rules/candidates-read.rule';
import { CandidatesUpdateRule } from './rules/candidates-update.rule';

const AccessControlServiceProvider = AccessControlServiceProviderFactory();

@Module({
  imports: [BusinessModule, DiscoveryModule],
  providers: [AccessControlServiceProvider, CandidatesReadRule, CandidatesUpdateRule],
  exports: [AccessControlServiceProvider],
})
export class AccessControlModule {}
