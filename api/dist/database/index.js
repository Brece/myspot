"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ormConfig = require("../../ormconfig.js");
delete ormConfig.cli;
delete ormConfig.seeds;
exports.default = new typeorm_1.DataSource(ormConfig);
//# sourceMappingURL=index.js.map