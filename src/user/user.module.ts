import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { RoleGuard } from '../common/guards/role.guard';
import { User } from '../database/typeorm/entities/user.entity';
import { EmailService } from '../common/services/email.service';
import { EventListenerService } from './eventListener.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    RoleGuard,
    EmailService,
    EventListenerService,
  ],
  exports: [UserService],
})
export class UserModule {}
