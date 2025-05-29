import { BaseRepository } from 'src/database/base.repository';
import { Task } from 'src/database/entities/task.entity';
import { ITasksRepository } from './interfaces/task.interface';
import { Repository } from 'typeorm';
export declare class TasksRepository extends BaseRepository<Task> implements ITasksRepository {
    private readonly taskRepository;
    constructor(taskRepository: Repository<Task>);
}
