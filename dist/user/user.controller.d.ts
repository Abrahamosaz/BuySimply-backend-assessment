import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    getUser(id: string): Promise<import("src/database/entities/user.entity").User>;
    createUser(createUserDto: CreateUserDto): Promise<void>;
}
