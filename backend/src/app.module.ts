import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoveryPasswordCode, SessionCookie, User } from './users/users.entity.js';
import { ConfigModule } from '@nestjs/config';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'backend',
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "timurp",
      database: "clear",
      password: "",
      entities: [User,RecoveryPasswordCode, SessionCookie],
      synchronize: true
    }),UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
