import './src/boilerplate.polyfill';

import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { SnakeNamingStrategy } from './src/snake-naming.strategy';
import { UserSubscriber } from './src/entity-subscribers/user-subscriber';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

export const dataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [UserSubscriber],
  entities: [
    'src/modules/**/*.entity{.ts,.js}',
    'src/modules/**/*.view-entity{.ts,.js}',
  ],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  ssl: databaseUrl?.includes('neon.tech')
    ? { rejectUnauthorized: false } // Required for Neon databases
    : undefined,
});
