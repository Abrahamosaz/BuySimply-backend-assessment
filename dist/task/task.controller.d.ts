import { TaskService } from './task.service';
import { UpdateTaskDto } from './dtos/updateTask.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getTasks(): Promise<import("../database/entities/task.entity").Task[]>;
    getTask(id: string): Promise<import("../database/entities/task.entity").Task>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<void>;
    deleteTask(id: string): Promise<void>;
}
