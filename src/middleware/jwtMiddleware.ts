import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException('No access token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.verifyPayloadId(payload.id);
      req['user'] = user;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async verifyPayloadId(id: string) {
    const user = await this.userService.getUser(id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
