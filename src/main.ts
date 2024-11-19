import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDatabaseConfigIfNotExist } from './configs/database.config';
import { configureWebSettings } from './configs/web.config';
import { envConfig } from './constants/env.constant';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function start() {
    await createDatabaseConfigIfNotExist();

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Automatically strip any properties not defined in the DTO
            forbidNonWhitelisted: true, // Throw an error if extra properties are included
            transform: true,
        }),
    );
    app.useGlobalInterceptors(new LoggingInterceptor());

    configureWebSettings(app);
    await app.listen(envConfig.SERVER_PORT);
}

start();
