import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'node:process';
import { Client } from 'pg';
import { envConfig } from '../constants/env.constant';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: envConfig.DB_HOST,
    port: +envConfig.DB_PORT,
    username: envConfig.DB_USERNAME,
    password: envConfig.DB_PASSWORD,
    database: envConfig.DB_NAME,
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    extra: {
        connectionLimit: 10,
    },
};

export const createDatabaseConfigIfNotExist = async () => {
    try {
        const client = new Client({
            host: envConfig.DB_HOST,
            user: envConfig.DB_USERNAME,
            password: envConfig.DB_PASSWORD,
        });

        await client.connect();

        const dbName = envConfig.DB_NAME;
        console.log(`Checking if database '${dbName}' exists...`);
        const result = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [dbName],
        );

        if (result.rowCount === 0) {
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database '${dbName}' created successfully.`);
        } else {
            console.log(`Database '${dbName}' already exists.`);
        }

        await client.end();
    } catch (error) {
        console.error(`Error while creating database: ${error}`);
        process.exit(0);
    }
};
