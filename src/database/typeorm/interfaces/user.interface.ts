import { User } from '../entities/user.entity';
import { IBaseRepository } from '../base.interface';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findActiveUsers(): Promise<User[]>;
}
