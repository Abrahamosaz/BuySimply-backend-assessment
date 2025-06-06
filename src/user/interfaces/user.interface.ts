import { IBaseRepository } from '../../database/typeorm/base.interface';
import { User } from '../../database/typeorm/entities/user.entity';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findActiveUsers(): Promise<User[]>;
}
