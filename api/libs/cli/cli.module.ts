import { DatabaseModule } from '@database';
import { SchemaModule } from '@database/schema.module';
import { Module } from '@nestjs/common';
import { TokenModule } from '@token';
import { CommandModule } from 'nestjs-command';

import { CustomCmd } from './custom.cmd';
import { DbCmd } from './db.cmd';
import { TokenCmd } from './token.cmd';

@Module({
  imports: [CommandModule, DatabaseModule, SchemaModule, TokenModule],
  providers: [CustomCmd, DbCmd, TokenCmd],
})
export class CliModule {}
