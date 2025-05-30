import { Exclude, Expose, Transform } from 'class-transformer';
import { User, UserRole } from '../database/typeorm/entities/user.entity';

export class UserSerializer {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  role: UserRole;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  password: string;

  @Expose()
  @Transform(({ value }) => value?.length || 0)
  tasks: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
