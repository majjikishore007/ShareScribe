declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string;
      NODE_ENV: string;
      APP_SECRET: string;
      JWT_SECRET: string;
      DATABASE_HOST: string;
      DATABASE_PORT: number;
      DATABASE_NAME: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
    }
  }
}

export {}
