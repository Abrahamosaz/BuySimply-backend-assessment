import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dtos/updateTask.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dtos/createTask.dto';
import { Request } from 'express';
import { ApiPaginatedTaskResponse } from '../common/decorators/swagger-doc/task/getAllTasksPagination.decorator';
import { ApiCreateTaskResponse } from '../common/decorators/swagger-doc/task/createTask.decorator';
import { ApiUpdateTaskResponse } from '../common/decorators/swagger-doc/task/updateTask.decorator';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ApiGetTaskByIdResponse } from '../common/decorators/swagger-doc/task/getTaskById.decorator';
import { ApiDeleteTaskResponse } from '../common/decorators/swagger-doc/task/deleteTask.decorator';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiPaginatedTaskResponse()
  async getTasks(@Query() paginationDto: PaginationDto) {
    return this.taskService.getTasks(paginationDto);
  }

  @Get(':id')
  @ApiGetTaskByIdResponse()
  async getTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.getTask(id);
  }

  @Post()
  @ApiCreateTaskResponse()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  @ApiUpdateTaskResponse()
  async updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiDeleteTaskResponse()
  async deleteTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.deleteTask(id);
  }
}
