import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { constants } from './config/constants';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // Create the app
  const app = await NestFactory.create(AppModule);
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
  // Enable Swagger based API docs
  const options = new DocumentBuilder()
    .setTitle('Boilerplate app')
    .setDescription('Boilerplate API description')
    .setVersion('1.0')
    .addTag('boilerplate')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  // Start listening on port number defined in constants
  await app.listen(constants.httpPort);
}
bootstrap();
