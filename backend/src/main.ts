import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.useGlobalPipes(new ValidationPipe({stopAtFirstError: true, whitelist: true}));
  app.enableCors({ origin: 'http://localhost:5173' });
  app.use(cookieParser('secret-tocen'))
}
await bootstrap();
