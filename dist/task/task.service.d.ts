import { TasksRepository } from './tast.repository';
import { UpdateTaskDto } from './dtos/updateTask.dto';
export declare class TaskService {
    private readonly tasksRepository;
    constructor(tasksRepository: TasksRepository);
    getTasks(): Promise<import("../database/entities/task.entity").Task[]>;
    getTask(id: string): Promise<import("../database/entities/task.entity").Task>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<void>;
    deleteTask(id: string): Promise<void>;
}
