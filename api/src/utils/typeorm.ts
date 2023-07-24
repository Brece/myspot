import { config } from 'dotenv';
config({ path: '../.env' });

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

import * as ormConfig from '../../ormconfig';

delete ormConfig.cli;
delete ormConfig.migrations;
delete ormConfig.seeds;
ormConfig.autoLoadEntities = true;
ormConfig.entities = [join(__dirname), '../modules/**/*.entity.js'];

export const TypeOrmConfig: TypeOrmModuleOptions = { ...ormConfig };
