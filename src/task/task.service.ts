import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tast.repository';
import { UpdateTaskDto } from './dtos/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTasks() {
    return this.tasksRepository.find({});
  }

  async getTask(id: string) {
    return this.tasksRepository.findOne(id);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {}

  async deleteTask(id: string) {
    return this.tasksRepository.delete(id);
  }
}
