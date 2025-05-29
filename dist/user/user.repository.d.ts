import { BaseRepository } from 'src/database/base.repository';
import { Repository } from 'typeorm';
import { IUserRepository } from './interfaces/user.interface';
import { User } from 'src/database/entities/user.entity';
export declare class UserRepository extends BaseRepository<User> implements IUserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findActiveUsers(): Promise<User[]>;
}
