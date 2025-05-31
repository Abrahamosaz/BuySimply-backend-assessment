import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TasksRepository } from './tast.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleGuard } from '../common/guards/role.guard';
import { Task } from '../database/typeorm/entities/task.entity';
import { EmailService } from '../common/services/email.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), EventEmitterModule.forRoot()],
  controllers: [TaskController],
  providers: [TaskService, RoleGuard, TasksRepository, EmailService],
})
export class TaskModule {}
