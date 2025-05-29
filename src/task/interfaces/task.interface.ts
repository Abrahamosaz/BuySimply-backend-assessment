import { IBaseRepository } from '../../database/typeorm/base.interface';
import { Task } from '../../database/typeorm/entities/task.entity';

export interface ITasksRepository extends IBaseRepository<Task> {}
