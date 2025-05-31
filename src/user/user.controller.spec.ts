import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRole } from '../database/typeorm/entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    getUsers: jest.fn(),
    getUser: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return paginated users', async () => {
      const paginationDto = { page: 1, limit: 10 };
      const result = { data: [], total: 0 };
      mockUserService.getUsers.mockResolvedValue(result);

      expect(await controller.getUsers(paginationDto as any)).toBe(result);
      expect(mockUserService.getUsers).toHaveBeenCalledWith(paginationDto);
    });
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const userId = 'some-uuid';
      const user = { id: userId, name: 'Test', role: UserRole.ADMIN };
      mockUserService.getUser.mockResolvedValue(user);

      expect(await controller.getUser(userId)).toBe(user);
      expect(mockUserService.getUser).toHaveBeenCalledWith(userId);
    });
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const createUserDto = {
        name: 'Test',
        email: 'test@example.com',
        password: 'pass',
        role: UserRole.ADMIN,
      };
      const createdUser = { id: 'uuid', ...createUserDto };
      mockUserService.createUser.mockResolvedValue(createdUser);

      expect(await controller.createUser(createUserDto as any)).toBe(
        createdUser,
      );
      expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });
});
