import { INestApplication } from '@nestjs/common';

export const corsConfig = {
  origin: '*',
  methods: '*',
  allowedHeaders: '*', // Allow all headers
  credentials: true,
};

export function configureWebSettings(app: INestApplication) {
  app.enableCors(corsConfig);
}
