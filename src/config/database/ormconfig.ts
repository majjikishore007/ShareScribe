import path from 'path';
import { DataSource } from 'typeorm';
import { _DATABASE_HOST_, _DATABASE_NAME_, _DATABASE_PASSWORD_, _DATABASE_USER_, _PROD_ } from '../../credentials';
export const AppDataSource = new DataSource({
  type: 'postgres',
  poolSize: 10,
  host: _DATABASE_HOST_,
  port: 5432,
  username: _DATABASE_USER_,
  password: _DATABASE_PASSWORD_,
  database: _DATABASE_NAME_,
  synchronize: false,
  dropSchema: false,
  logging: !_PROD_,
  entities: [path.join(__dirname, '../../', 'models', '**', '*.*'), path.join(__dirname, '../../', 'models', '*.*')],
  migrations: [path.join(__dirname, '../../', 'config/database/Migrations', '*.*')]
});
