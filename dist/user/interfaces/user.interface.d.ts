import { User } from 'src/database/entities/user.entity';
import { IBaseRepository } from 'src/database/base.interface';
export interface IUserRepository extends IBaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
    findActiveUsers(): Promise<User[]>;
}
