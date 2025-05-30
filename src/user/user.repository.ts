import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { IUserRepository } from './interfaces/user.interface';
import { User } from '../database/typeorm/entities/user.entity';
import { BaseRepository } from '../database/typeorm/base.repository';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOneBy({ email } as any);
  }

  async findActiveUsers(): Promise<User[]> {
    return this.find({ isActive: true } as any);
  }

  async findAndCount(
    options: FindManyOptions<User>,
  ): Promise<[User[], number]> {
    return this.userRepository.findAndCount(options);
  }
}
