import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TasksRepository } from './tast.repository';
import { NotFoundException, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TaskSerializer } from './task.serializer';
import { EventEmitter2 } from '@nestjs/event-emitter';

const mockTasksRepository = () => ({
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

const mockEventEmitter = () => ({
  emitAsync: jest.fn(),
});

describe('TaskService', () => {
  let service: TaskService;
  let tasksRepository: ReturnType<typeof mockTasksRepository>;
  let eventEmitter: ReturnType<typeof mockEventEmitter>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
        { provide: EventEmitter2, useFactory: mockEventEmitter },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    tasksRepository = module.get<TasksRepository>(TasksRepository) as any;
    eventEmitter = module.get<EventEmitter2>(EventEmitter2) as any;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return paginated and serialized tasks', async () => {
      const tasks = [{ id: 1 }, { id: 2 }];
      tasksRepository.findAndCount.mockResolvedValue([tasks, 2]);
      const result = await service.getTasks({ page: 1, limit: 2 });
      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.data.tasks.length).toBe(2);
      expect(result.data.pagination.total).toBe(2);
    });
  });

  describe('getTask', () => {
    it('should return a task if found', async () => {
      const task = { id: 1 };
      tasksRepository.findOne.mockResolvedValue(task);
      const result = await service.getTask('1');
      expect(result.data).toEqual(task);
    });

    it('should throw NotFoundException if task not found', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      await expect(service.getTask('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTask', () => {
    it('should create and serialize a task', async () => {
      const dto = { title: 'Test' };
      const task = { id: 1, ...dto };
      tasksRepository.create.mockResolvedValue(task);
      const result = await service.createTask(dto as any);
      expect(result.statusCode).toBe(HttpStatus.CREATED);
      expect(result.data).toEqual(
        plainToInstance(TaskSerializer, task, {
          excludeExtraneousValues: true,
        }),
      );
    });
  });

  describe('updateTask', () => {
    it('should update and serialize a task', async () => {
      const id = '1';
      const dto = { title: 'Updated' };
      const task = { id, title: 'Old' };
      const updatedTask = { id, ...dto };
      tasksRepository.findOne.mockResolvedValue(task);
      tasksRepository.update.mockResolvedValue(updatedTask);
      const result = await service.updateTask(id, dto as any);
      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.data).toEqual(
        plainToInstance(TaskSerializer, updatedTask, {
          excludeExtraneousValues: true,
        }),
      );
    });

    it('should throw NotFoundException if task not found', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      await expect(service.updateTask('1', {} as any)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should validate assigned user exists', async () => {
      const id = '1';
      const dto = { assignedTo: 'user123' };
      const task = { id, title: 'Old' };
      tasksRepository.findOne.mockResolvedValue(task);
      eventEmitter.emitAsync.mockResolvedValue([null]);

      await expect(service.updateTask(id, dto as any)).rejects.toThrow(
        NotFoundException,
      );
      expect(eventEmitter.emitAsync).toHaveBeenCalledWith(
        'user.getById',
        'user123',
      );
    });

    it('should proceed with update when assigned user exists', async () => {
      const id = '1';
      const dto = { assignedTo: 'user123' };
      const task = { id, title: 'Old' };
      const updatedTask = { id, ...dto };
      const user = { id: 'user123', name: 'Test User' };

      tasksRepository.findOne.mockResolvedValue(task);
      eventEmitter.emitAsync.mockResolvedValue([user]);
      tasksRepository.update.mockResolvedValue(updatedTask);

      const result = await service.updateTask(id, dto as any);
      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.data).toEqual(
        plainToInstance(TaskSerializer, updatedTask, {
          excludeExtraneousValues: true,
        }),
      );
      expect(eventEmitter.emitAsync).toHaveBeenCalledWith(
        'user.getById',
        'user123',
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete a task if found', async () => {
      const task = { id: 1 };
      tasksRepository.findOne.mockResolvedValue(task);
      tasksRepository.delete.mockResolvedValue(undefined);
      const result = await service.deleteTask('1');
      expect(result.statusCode).toBe(HttpStatus.OK);
    });

    it('should throw NotFoundException if task not found', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      await expect(service.deleteTask('1')).rejects.toThrow(NotFoundException);
    });
  });
});
