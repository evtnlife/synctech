import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';

dotenv.config();

const mikroOrmConfig: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  dbName: process.env.DB_NAME ?? 'synctech_test',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  debug: process.env.MIKRO_DEBUG === 'true',
  forceEntityConstructor: true,
  entities: ['./dist/database/entities/*.entity.js'],
  entitiesTs: ['./src/database/entities/*.entity.ts'],
  migrations: {
    path: './src/database/migrations',
    pathTs: './src/database/migrations',
    glob: '!(*.d).{js,ts}',
  },
};

export default mikroOrmConfig;
