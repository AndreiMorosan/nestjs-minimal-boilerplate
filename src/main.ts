import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { setupSwagger } from './setup-swagger';
import { HttpExceptionFilter } from './filters/bad-request.filter';
import { QueryFailedFilter } from './filters/query-failed.filter';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';

async function bootstrap(): Promise<NestExpressApplication> {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.use(helmet());
  // app.setGlobalPrefix('/api'); use api as global prefix if you don't have subdomain
  app.use(compression());
  app.use(morgan('combined'));
  app.enableVersioning();
  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
    new QueryFailedFilter(reflector),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  const configService = app.select(SharedModule).get(ApiConfigService);

  if (configService.documentationEnabled) {
    setupSwagger(app);
  }

  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }

  const port = configService.appConfig.port;
  await app.listen(port ?? 3000);

  console.info(`server running on ${await app.getUrl()}`);

  return app;
}

void bootstrap();
