import { IBaseRepository } from 'src/database/base.interface';
import { Task } from 'src/database/entities/task.entity';
export interface ITasksRepository extends IBaseRepository<Task> {
}
