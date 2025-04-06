import { join } from 'node:path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ThrottlerOptions } from '@nestjs/throttler';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { neon } from '@neondatabase/serverless';
import { default as parse } from 'parse-duration';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { SnakeNamingStrategy } from '../../snake-naming.strategy';
import { UserSubscriber } from '../../entity-subscribers/user-subscriber';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const subscribers = [
  UserSubscriber,
]

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) { }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  public getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getDuration(
    key: string,
    format?: Parameters<typeof parse>[1],
  ): number {
    const value = this.getString(key);
    const duration = parse(value, format);

    if (duration === undefined) {
      throw new Error(`${key} environment variable is not a valid duration`);
    }

    return duration ?? 0;
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replaceAll('\\n', '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get throttlerConfigs(): ThrottlerOptions {
    return {
      ttl: this.getDuration('THROTTLER_TTL', 'second'),
      limit: this.getNumber('THROTTLER_LIMIT'),
      // storage: new ThrottlerStorageRedisService(new Redis(this.redis)),
    };
  }

  get postgresConfig(): TypeOrmModuleOptions {
    const databaseUrl = this.getString('DATABASE_URL');
    const entities = [
      join(__dirname + '/modules/**/*.entity{.ts,.js}'),
      join(__dirname + '/modules/**/*.view-entity{.ts,.js}'),
    ];

    const migrations = [
      join(__dirname + '/database/migrations/*{.ts,.js}'),
    ];

    const neonClient = neon(databaseUrl);

    return {
      type: this.getString('DB_TYPE') as 'postgres',
      url: databaseUrl, // Use Neon database URL
      entities,
      subscribers,
      migrations,
      migrationsRun: true,
      synchronize: this.isDevelopment, // Enable for development
      dropSchema: this.isTest, // Drop schema for testing
      logging: this.getBoolean('ENABLE_ORM_LOGS'),
      namingStrategy: new SnakeNamingStrategy(),
      extra: {
        sqlClient: neonClient,
      },
      autoLoadEntities: true,
    };
  }

  get awsS3Config() {
    return {
      accessKeyId: this.getString('AWS_S3_ACCESS_KEY_ID'),
      secretAccessKey: this.getString('AWS_S3_SECRET_ACCESS_KEY'),
      bucketRegion: this.getString('AWS_S3_BUCKET_REGION'),
      bucketApiVersion: this.getString('AWS_S3_API_VERSION'),
      bucketName: this.getString('AWS_S3_BUCKET_NAME'),
    };
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION');
  }

  get authConfig() {
    return {
      privateKey: this.getString('JWT_PRIVATE_KEY'),
      publicKey: this.getString('JWT_PUBLIC_KEY'),
      jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
      refreshTokenExpirationTime: this.getNumber('JWT_REFRESH_EXPIRATION_TIME'),
    };
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (value == null) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }
}
