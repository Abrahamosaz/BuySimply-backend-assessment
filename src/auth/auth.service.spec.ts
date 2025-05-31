import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let eventEmitter: EventEmitter2;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedPassword',
    role: 'user',
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockToken'),
  };

  const mockEventEmitter = {
    emitAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should successfully login and return token and user', async () => {
      mockEventEmitter.emitAsync.mockResolvedValue([mockUser]);
      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(true);

      const result = await service.login(loginDto);

      expect(result).toEqual({
        access_token: 'mockToken',
        user: mockUser,
      });
      expect(mockEventEmitter.emitAsync).toHaveBeenCalledWith(
        'user.getByEmail',
        loginDto.email,
      );
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        id: mockUser.id,
        role: mockUser.role,
      });
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      mockEventEmitter.emitAsync.mockResolvedValue([null]);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockEventEmitter.emitAsync).toHaveBeenCalledWith(
        'user.getByEmail',
        loginDto.email,
      );
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      mockEventEmitter.emitAsync.mockResolvedValue([mockUser]);
      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockEventEmitter.emitAsync).toHaveBeenCalledWith(
        'user.getByEmail',
        loginDto.email,
      );
    });
  });
});
