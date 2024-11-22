import { HttpStatus } from '@nestjs/common';
import { injectable } from 'inversify';
import { env } from 'node:process';
import { IEnvironmentShared } from './types/environment-shared.types';
@injectable()
export class EnvironmentShared implements IEnvironmentShared {
  getEnv(envName: string) {
    if (!env[envName])
      throw { message: `enviroment var '${envName}' not found/not loaded.`, status: HttpStatus.INTERNAL_SERVER_ERROR };
    return env[envName];
  }
}
