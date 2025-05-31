import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async login(loginDto: LoginDto) {
    // check if that user is registered on the database
    const response = await this.eventEmitter.emitAsync(
      'user.getByEmail',
      loginDto.email,
    );

    const user = response?.[0];

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // check if the password is correct
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // generate a jwt token
    const token = this.jwtService.sign({ id: user.id, role: user.role });

    return {
      access_token: token,
      user,
    };
  }
}
