import { HttpStatus } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/createUser.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findByEmail(email: string): Promise<import("../database/entities/user.entity").User>;
    getUsers(): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    getUser(id: string): Promise<import("../database/entities/user.entity").User>;
    createUser(createUserDto: CreateUserDto): Promise<void>;
}
