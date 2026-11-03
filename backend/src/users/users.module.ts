import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoveryPasswordCode, SessionCookie, User } from './users.entity.js';
import { SendemailService } from './users.sendletter.service.js';
import { SessionServce } from './users.session.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, RecoveryPasswordCode, SessionCookie])],
  providers: [UsersService, SendemailService, SessionServce],
  controllers: [UsersController]
})
export class UsersModule {}
