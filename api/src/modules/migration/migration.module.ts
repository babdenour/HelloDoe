import { DatabaseModule } from '@database';
import { SchemaModule } from '@database/schema.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MigrationRunner, SCHEMA_NAME_MIGRATION } from './migration-runner';
import { MigrationSchema } from './migration-schema';

@Module({
  imports: [
    DatabaseModule,
    SchemaModule,
    MongooseModule.forFeature([{ name: SCHEMA_NAME_MIGRATION as string, schema: MigrationSchema }]),
  ],
  providers: [MigrationRunner],
})
export class MigrationModule {}
