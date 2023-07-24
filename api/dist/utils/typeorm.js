"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '../.env' });
const path_1 = require("path");
const ormConfig = require("../../ormconfig");
delete ormConfig.cli;
delete ormConfig.migrations;
delete ormConfig.seeds;
ormConfig.autoLoadEntities = true;
ormConfig.entities = [(0, path_1.join)(__dirname), '../modules/**/*.entity.js'];
exports.TypeOrmConfig = Object.assign({}, ormConfig);
//# sourceMappingURL=typeorm.js.map