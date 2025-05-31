import {
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/createUser.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../database/typeorm/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UserSerializer } from './user.serializer';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
    private readonly emailService: EmailService,
  ) {}

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async getUsers(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository.findAndCount({
      skip,
      take: limit,
    });

    const serializedUsers = users.map((user) =>
      plainToInstance(UserSerializer, user, {
        excludeExtraneousValues: true,
      }),
    );

    return {
      message: 'Users fetched successfully',
      statusCode: HttpStatus.OK,
      data: {
        users: serializedUsers,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const serializedUser = plainToInstance(UserSerializer, user, {
      excludeExtraneousValues: true,
    });

    return {
      message: 'User fetched successfully',
      statusCode: HttpStatus.OK,
      data: serializedUser,
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    // check if user with that email already exists
    const user = await this.userRepository.findByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('User with that email already exists');
    }

    // Start a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Create the user within the transaction
      const newUser = await queryRunner.manager.save(User, {
        ...createUserDto,
        password: hashedPassword,
        role: UserRole.USER,
        isActive: true,
      });

      // Commit the transaction
      await queryRunner.commitTransaction();

      try {
        // send email to the user
        this.emailService.sendEmail({
          to: newUser.email,
          subject: 'Welcome to the app',
          template: 'auth/welcome.email.hbs',
          context: {
            firstName: newUser.firstName,
            currentYear: new Date().getFullYear(),
          },
        });
      } catch (error) {
        this.logger.error('Error sending welcome email', error);
      }

      const serializedUser = plainToInstance(UserSerializer, newUser, {
        excludeExtraneousValues: true,
      });

      return {
        message: 'User created successfully',
        statusCode: HttpStatus.CREATED,
        data: serializedUser,
      };
    } catch (error) {
      // Rollback the transaction in case of error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);

    return {
      message: 'User deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
