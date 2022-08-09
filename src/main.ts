import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import fastifyCsrf from 'fastify-csrf';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true,
    },
  );
  await app.register(compression, { encodings: ['gzip'] });
  await app.register(helmet);
  await app.register(fastifyCsrf);

  await app.listen(3000);
}

bootstrap();
