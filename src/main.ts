import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { constants } from './config/constants';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Create the app
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  // Helmet security:
  // - dnsPrefetchControl
  // - frameguard
  // - hidePoweredBy
  // - hsts
  // - ieNoOpen
  // - noSniff
  // - xssFilter
  // more info: https://helmetjs.github.io/docs/
  app.use(helmet());
  // Enable Cross-origin resource sharing
  app.enableCors();
  // Rate limiting
  app.use(
    rateLimit({
      windowMs: constants.rateLimitWindow,
      max: constants.rateLimitMaxReqPerWindow,
    }),
  );
  // Enable shutdown hooks
  app.enableShutdownHooks();
  // Start listening on port number defined in constants
  await app.listen(constants.httpPort);
}
bootstrap();
