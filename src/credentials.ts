import dotenv from 'dotenv-safe';
dotenv.config();

export const _PROD_ = process.env.NODE_ENV === 'production';
export const _APP_PORT_ = process.env.APP_PORT;
export const _APP_SECRET_ = process.env.APP_SECRET;
export const _APP_HOST_ = process.env.APP_HOST;

export const _DATABASE_HOST_ = process.env.DATABASE_HOST;
export const _DATABASE_PORT_ = process.env.DATABASE_PORT;
export const _DATABASE_USER_ = process.env.DATABASE_USER;
export const _DATABASE_PASSWORD_ = process.env.DATABASE_PASSWORD;
export const _DATABASE_NAME_ = process.env.DATABASE_NAME;
