import { Reflector } from '@nestjs/core';
import { UserRole } from '../../database/typeorm/entities/user.entity';

export const Roles = Reflector.createDecorator<UserRole[]>();
