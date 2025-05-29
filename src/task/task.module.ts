import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TasksRepository } from './tast.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleGuard } from '../common/guards/role.guard';
import { Task } from '../database/typeorm/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService, RoleGuard, TasksRepository],
})
export class TaskModule {}
