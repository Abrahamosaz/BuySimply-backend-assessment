import { IBaseRepository } from '../../database/base.interface';
import { Task } from '../../database/entities/task.entity';

export interface ITasksRepository extends IBaseRepository<Task> {}
