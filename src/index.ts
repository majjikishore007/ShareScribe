import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import swaggerUi, { type JsonObject } from 'swagger-ui-express';
import { AppDataSource } from './config/database/ormconfig';
import { _APP_PORT_ } from './credentials';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import noteRotues from './routes/note';
import shareNoteRoutes from './routes/shareNote';
import cookieParser from 'cookie-parser';
import { getSwaggerDoc } from './config/swagger';
const main = async (): Promise<void> => {
  try {
    // Database connection
    console.log('Connecting to database...');

    const database = await AppDataSource.initialize();
    if (database.isInitialized) {
      console.log('Database connected');
    }
    // await database.runMigrations();

    // Express server
    const app: express.Application = express();

    // Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(
      cors({
        origin: '*',
        credentials: true
      })
    );

    // Swagger
    const swaggerDoc: JsonObject = await getSwaggerDoc();
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    app.get('/docs.json', (_req, res) => {
      res.send(swaggerDoc);
    });
    // Routes
    app.get('/health', (_req: express.Request, res: express.Response) => {
      res.status(200).json('Sever is healthy');
    });
    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/note', noteRotues);
    app.use('/api/notes', shareNoteRoutes);
    app.listen(_APP_PORT_, () => {
      console.log(`Server listening on port ${_APP_PORT_}`);
    });
  } catch (error) {
    console.log(error);
  }
};
main().catch((err) => {
  console.error(err);
});
