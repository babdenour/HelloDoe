/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { Command } from 'nestjs-command';

faker.setLocale('fr');

@Injectable()
export class CustomCmd {
  constructor() {}

  @Command({
    command: 'custom:run',
    describe: 'Run a custom script written by hand',
    autoExit: true,
  })
  async runCustom(): Promise<void> {}
}
