import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoveryPasswordCode, User } from './users.entity.js';
import { SendemailService } from './users.sendletter.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, RecoveryPasswordCode])],
  providers: [UsersService, SendemailService],
  controllers: [UsersController]
})
export class UsersModule {}
