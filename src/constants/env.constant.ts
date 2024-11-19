import * as dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

export const envConfig = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  SERVER_PORT: process.env.SERVER_PORT,
};
