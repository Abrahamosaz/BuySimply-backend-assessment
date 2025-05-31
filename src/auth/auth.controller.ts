import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { ApiLoginResponse } from '../common/decorators/swagger-doc/auth/login.decorator';
import { ApiLogoutResponse } from '../common/decorators/swagger-doc/auth/logout.decorator';
import { UserSerializer } from '../user/user.serializer';
import { plainToInstance } from 'class-transformer';
import { User } from '../database/typeorm/entities/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @ApiLoginResponse()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.authService.login(loginDto);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    const serializedUser = plainToInstance(UserSerializer, User, {
      excludeExtraneousValues: true,
    });

    return {
      message: 'Login successful',
      statusCode: HttpStatus.OK,
      data: serializedUser,
    };
  }

  @Post('logout')
  @ApiLogoutResponse()
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logout successful', StatusCode: HttpStatus.OK };
  }
}
