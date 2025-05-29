import { IBaseRepository } from '../../database/base.interface';
import { User } from '../../database/entities/user.entity';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findActiveUsers(): Promise<User[]>;
}
