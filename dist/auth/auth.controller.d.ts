import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    login(loginDto: LoginDto, res: Response): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    logout(res: Response): Promise<{
        message: string;
        StatusCode: HttpStatus;
    }>;
}
