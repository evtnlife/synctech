import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const mikroOrmConfig: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  dbName: 'synctech_test',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  entities: ['./dist/database/entities/*.entity.js'],
  entitiesTs: ['./src/database/entities/*.entity.ts'],
  debug: true,
  forceEntityConstructor: true,
};

export default mikroOrmConfig;
