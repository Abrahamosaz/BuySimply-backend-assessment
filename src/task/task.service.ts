import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TasksRepository } from './tast.repository';
import { UpdateTaskDto } from './dtos/updateTask.dto';
import { CreateTaskDto } from './dtos/createTask.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { plainToInstance } from 'class-transformer';
import { TaskSerializer } from './task.serializer';
import { UserService } from '../user/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getTasks(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [tasks, total] = await this.tasksRepository.findAndCount({
      skip,
      take: limit,
    });

    const serializedTasks = tasks.map((task) =>
      plainToInstance(TaskSerializer, task, {
        excludeExtraneousValues: true,
      }),
    );

    return {
      message: 'Tasks fetched successfully',
      statusCode: HttpStatus.OK,
      data: {
        tasks: serializedTasks,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  }

  async getTask(id: string) {
    //check if the task exists
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('Task with id does not exist');
    }

    return {
      message: 'Task fetched successfully',
      statusCode: HttpStatus.OK,
      data: task,
    };
  }

  async createTask(createTaskDto: CreateTaskDto) {
    // create task
    const task = await this.tasksRepository.create(createTaskDto);

    const serializedTask = plainToInstance(TaskSerializer, task, {
      excludeExtraneousValues: true,
    });

    return {
      message: 'Task created successfully',
      statusCode: HttpStatus.CREATED,
      data: serializedTask,
    };
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    // check if task with the id exists
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('Task with id does not exist');
    }

    if (updateTaskDto.assignedTo) {
      const response = await this.eventEmitter.emitAsync(
        'user.getById',
        updateTaskDto.assignedTo,
      );

      const user = response?.[0];

      if (!user) {
        throw new NotFoundException('Assigned user does not exist');
      }
    }

    // update the task
    const udatedTask = await this.tasksRepository.update(id, updateTaskDto);

    const serializedTask = plainToInstance(TaskSerializer, udatedTask, {
      excludeExtraneousValues: true,
    });

    return {
      message: 'Task updated successfully',
      statusCode: HttpStatus.OK,
      data: serializedTask,
    };
  }

  async deleteTask(id: string) {
    //check if the task exists
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('Task with id does not exist');
    }

    await this.tasksRepository.delete(id);

    return {
      message: 'Task deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
