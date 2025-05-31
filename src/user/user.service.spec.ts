import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { DataSource, QueryRunner } from 'typeorm';
import { EmailService } from '../common/services/email.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserRole } from '../database/typeorm/entities/user.entity';

const mockUserRepository = () => ({
  findByEmail: jest.fn(),
  findAndCount: jest.fn(),
  findOne: jest.fn(),
});
const mockDataSource = () => ({
  createQueryRunner: jest.fn(),
});
const mockEmailService = () => ({
  sendEmail: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let userRepository: ReturnType<typeof mockUserRepository>;
  let dataSource: ReturnType<typeof mockDataSource>;
  let emailService: ReturnType<typeof mockEmailService>;
  let queryRunner: Partial<QueryRunner>;

  beforeEach(async () => {
    queryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      manager: { save: jest.fn() } as any,
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: DataSource, useFactory: mockDataSource },
        { provide: EmailService, useFactory: mockEmailService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
    dataSource = module.get(DataSource);
    emailService = module.get(EmailService);

    (dataSource.createQueryRunner as jest.Mock).mockReturnValue(queryRunner);
  });

  describe('findByEmail', () => {
    it('should call userRepository.findByEmail', async () => {
      userRepository.findByEmail.mockResolvedValue('user');
      const result = await service.findByEmail('test@example.com');
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(result).toBe('user');
    });
  });

  describe('getUsers', () => {
    it('should return paginated users', async () => {
      userRepository.findAndCount.mockResolvedValue([[{ id: 1 }], 1]);
      const result = await service.getUsers({ page: 1, limit: 1 });
      expect(userRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 1,
      });
      expect(result.data.users.length).toBe(1);
      expect(result.data.pagination.total).toBe(1);
    });
  });

  describe('getUser', () => {
    it('should return a user if found', async () => {
      userRepository.findOne.mockResolvedValue({ id: 1 });
      const result = await service.getUser('1');
      expect(userRepository.findOne).toHaveBeenCalledWith('1');
      expect(result.data.id).toBe(1);
    });

    it('should throw NotFoundException if user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(service.getUser('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createUser', () => {
    it('should throw ConflictException if user exists', async () => {
      userRepository.findByEmail.mockResolvedValue({ id: 1 });
      await expect(
        service.createUser({
          email: 'test@example.com',
          password: 'pass',
          firstName: 'A',
          lastName: 'B',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create a user and send email', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      (queryRunner.manager.save as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        firstName: 'A',
        lastName: 'B',
        role: UserRole.USER,
        isActive: true,
      });

      const result = await service.createUser({
        email: 'test@example.com',
        password: 'pass',
        firstName: 'A',
        lastName: 'B',
      });

      expect(queryRunner.manager.save).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(emailService.sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@example.com',
          subject: 'Welcome to the app',
        }),
      );
      expect(result.data.id).toBe(1);
    });

    it('should rollback transaction on error', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      (queryRunner.manager.save as jest.Mock).mockRejectedValue(
        new Error('fail'),
      );
      await expect(
        service.createUser({
          email: 'test@example.com',
          password: 'pass',
          firstName: 'A',
          lastName: 'B',
        }),
      ).rejects.toThrow('fail');
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
    });
  });
});
