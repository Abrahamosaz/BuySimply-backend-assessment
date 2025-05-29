import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class JwtMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyPayloadId(id: string): Promise<import("../database/entities/user.entity").User>;
}
