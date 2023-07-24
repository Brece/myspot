// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '../.env' });

module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  entities: ['src/**/*.entity{.ts, .js'],

  synchronize: false,

  cli: {
    migrationsDir: 'src/database/migrations',
  },

  migrations: ['src/database/migrations/*.ts'],

  seeds: ['src/database/seeds/*.seeder{.ts, .js}'],
};
