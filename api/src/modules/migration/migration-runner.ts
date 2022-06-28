import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';

import { MigrationDoc } from './migration-schema';
import { Migration } from './types/migration';

export const SCHEMA_NAME_MIGRATION = 'MIGRATION';

interface MigrationToRun {
  name: string;
  migration: Migration;
}

@Injectable()
export class MigrationRunner implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    @InjectModel(SCHEMA_NAME_MIGRATION) private readonly migrationModel: Model<MigrationDoc>,
  ) {}

  async onModuleInit(): Promise<void> {
    const state = await this.getOrCreateMigrationState();
    const migrationToRunList = await this.getMigrationsToRun(state);
    await this.runMigrations(migrationToRunList, state);
  }

  private async getOrCreateMigrationState(): Promise<MigrationDoc> {
    let [state] = await this.migrationModel.find({});
    if (!state) {
      state = new this.migrationModel();
      await state.save();
    }

    return state;
  }

  private async getMigrationsToRun(state: MigrationDoc): Promise<MigrationToRun[]> {
    const migrationsFolder = path.join(__dirname, 'migrations');

    const migrationAlreadyRunList: Map<string, boolean> = state.migrations.reduce<Map<string, boolean>>(
      (acc: Map<string, boolean>, current) => {
        acc.set(current.title, true);
        return acc;
      },
      new Map(),
    );
    let migrationFiles = fs.readdirSync(migrationsFolder).sort();
    const lastRunIdx = migrationFiles.findIndex((fileName: string) => fileName === state.lastRun);
    migrationFiles.splice(0, lastRunIdx + 1);

    migrationFiles = migrationFiles
      .filter((fileName: string) => fileName.substr(-3) === '.js' && fileName.substr(-8) !== '.spec.js')
      .filter((fileName: string) => !migrationAlreadyRunList.has(fileName))
      .sort();

    const migrationsToRun: MigrationToRun[] = [];
    for (const fileName of migrationFiles) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { default: MigrationClass } = await import(path.join(migrationsFolder, fileName));
      const migration = await this.moduleRef.create<Migration>(MigrationClass);
      migrationsToRun.push({ migration, name: fileName });
    }

    return migrationsToRun;
  }

  private async runMigrations(migrationToRunList: MigrationToRun[], state: MigrationDoc): Promise<void> {
    console.log(`running migrations`);
    for (const migrationToRun of migrationToRunList) {
      console.log(`  - ${migrationToRun.name}`);
      await migrationToRun.migration.up();

      state.lastRun = migrationToRun.name;
      state.migrations.push({ title: migrationToRun.name, timestamp: Date.now() });
      await state.save();
    }

    if (migrationToRunList.length === 0) {
      console.log(`no migrations to run`);
    }
  }
}
