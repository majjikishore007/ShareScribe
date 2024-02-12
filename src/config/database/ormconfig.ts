import path from 'path';
import { DataSource } from 'typeorm';
import { _DATABASE_HOST_, _DATABASE_NAME_, _DATABASE_PASSWORD_, _DATABASE_USER_, _PROD_ } from '../../credentials';
console.log('database host and port ', _DATABASE_HOST_);
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

export const attemptDatabaseConnection = async (retryCount = 3, interval = 5000): Promise<void> => {
  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      console.log(`Connecting to database... Attempt ${attempt}`);
      const database = await AppDataSource.initialize();
      if (database.isInitialized) {
        console.log('Database connected');
        return;
      }
    } catch (error) {
      console.log(`Attempt ${attempt} failed:`, error);
      if (attempt < retryCount) {
        console.log(`Retrying in ${interval / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, interval));
      } else {
        console.log('All attempts to connect to the database have failed.');
        throw error; // Rethrow the last error
      }
    }
  }
};
