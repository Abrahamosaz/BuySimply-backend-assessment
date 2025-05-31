import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dtos/login.dto';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let configService: ConfigService;

  const mockAuthService = {
    login: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockResponse = {
    cookie: jest.fn(),
    clearCookie: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    const mockLoginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockLoginResponse = {
      access_token: 'mock-token',
      user: {
        id: 1,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        tasks: 0,
      },
    };

    it('should successfully login and set cookie', async () => {
      mockAuthService.login.mockResolvedValue(mockLoginResponse);
      mockConfigService.get.mockReturnValue('development');

      const result = await controller.login(mockLoginDto, mockResponse);

      expect(authService.login).toHaveBeenCalledWith(mockLoginDto);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access_token',
        mockLoginResponse.access_token,
        {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000,
        },
      );
      expect(result).toEqual({
        message: 'Login successful',
        statusCode: 200,
        data: expect.objectContaining({
          id: mockLoginResponse.user.id,
          email: mockLoginResponse.user.email,
          firstName: mockLoginResponse.user.firstName,
          lastName: mockLoginResponse.user.lastName,
          role: mockLoginResponse.user.role,
          isActive: mockLoginResponse.user.isActive,
          tasks: 0,
        }),
      });
    });

    it('should set secure cookie in production environment', async () => {
      mockAuthService.login.mockResolvedValue(mockLoginResponse);
      mockConfigService.get.mockReturnValue('production');

      await controller.login(mockLoginDto, mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access_token',
        mockLoginResponse.access_token,
        {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000,
        },
      );
    });
  });

  describe('logout', () => {
    it('should successfully logout and clear cookie', async () => {
      const result = await controller.logout(mockResponse);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith('access_token');
      expect(result).toEqual({
        message: 'Logout successful',
        StatusCode: 200,
      });
    });
  });
});
