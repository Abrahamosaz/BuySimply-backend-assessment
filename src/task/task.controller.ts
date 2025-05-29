import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dtos/updateTask.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  async getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    return this.taskService.getTask(id);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
