import { ITasksRepository } from './interfaces/task.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../database/typeorm/entities/task.entity';
import { BaseRepository } from '../database/typeorm/base.repository';

@Injectable()
export class TasksRepository
  extends BaseRepository<Task>
  implements ITasksRepository
{
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }
}
