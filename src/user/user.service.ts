import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async getUsers() {
    // return this.userRepository.find();

    return {
      message: 'Users fetched successfully',
      statusCode: HttpStatus.OK,
    };
  }

  async getUser(id: string) {
    return this.userRepository.findOne(id);
  }

  async createUser(createUserDto: CreateUserDto) {}
}
