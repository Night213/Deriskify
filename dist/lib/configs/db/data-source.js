"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.dataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get('DB_PORT', 5432),
    username: configService.get('DB_USER', 'postgres'),
    password: configService.get('DB_PASSWORD', 'postgres'),
    database: configService.get('DB_NAME', 'deriskify_db'),
    entities: [`${__dirname}/../../../**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/../../../migrations/*{.ts,.js}`],
    logging: configService.get('DB_LOGGING', false),
    dropSchema: false,
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map