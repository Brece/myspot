import { DataSource } from 'typeorm';

import * as ormConfig from '../../ormconfig.js';

delete ormConfig.cli;
delete ormConfig.seeds;

export default new DataSource(ormConfig);
