import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/createTask.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Priority, TaskStatus } from '../database/typeorm/entities/task.entity';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockTaskService = {
    getTasks: jest.fn(),
    getTask: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTasks', () => {
    it('should call service.getTasks with paginationDto', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10 };
      const result = [{ id: '1', title: 'Test Task' }];
      mockTaskService.getTasks.mockResolvedValue(result);

      expect(await controller.getTasks(paginationDto)).toBe(result);
      expect(service.getTasks).toHaveBeenCalledWith(paginationDto);
    });
  });

  describe('getTask', () => {
    it('should call service.getTask with id', async () => {
      const id = 'uuid-123';
      const result = { id, title: 'Test Task' };
      mockTaskService.getTask.mockResolvedValue(result);

      expect(await controller.getTask(id)).toBe(result);
      expect(service.getTask).toHaveBeenCalledWith(id);
    });
  });

  describe('createTask', () => {
    it('should call service.createTask with dto', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'desc',
        priority: Priority.LOW,
        dueDate: new Date().toISOString(),
      };
      const user = { id: 'user-1' };
      const req = { user } as any;
      const result = { id: '1', ...createTaskDto, user };
      mockTaskService.createTask.mockResolvedValue(result);

      expect(await controller.createTask(createTaskDto, req)).toBe(result);
      expect(service.createTask).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('updateTask', () => {
    it('should call service.updateTask with id and dto', async () => {
      const id = 'uuid-123';
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
        status: TaskStatus.TODO,
        priority: Priority.LOW,
        dueDate: new Date().toISOString(),
        assignedTo: 'user-1',
      };
      const result = { id, ...updateTaskDto };
      mockTaskService.updateTask.mockResolvedValue(result);

      expect(await controller.updateTask(id, updateTaskDto)).toBe(result);
      expect(service.updateTask).toHaveBeenCalledWith(id, updateTaskDto);
    });
  });

  describe('deleteTask', () => {
    it('should call service.deleteTask with id', async () => {
      const id = 'uuid-123';
      const result = { deleted: true };
      mockTaskService.deleteTask.mockResolvedValue(result);

      expect(await controller.deleteTask(id)).toBe(result);
      expect(service.deleteTask).toHaveBeenCalledWith(id);
    });
  });
});
