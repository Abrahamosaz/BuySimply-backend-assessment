import { Exclude, Expose } from 'class-transformer';
import {
  Priority,
  Task,
  TaskStatus,
} from '../database/typeorm/entities/task.entity';
import { User } from '../database/typeorm/entities/user.entity';

export class TaskSerializer {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  dueDate: Date;

  @Expose()
  priority: Priority;

  @Expose()
  assignedTo: User;

  @Expose()
  status: TaskStatus;

  @Expose()
  createdAt: Date;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}
