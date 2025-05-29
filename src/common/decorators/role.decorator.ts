import { Reflector } from '@nestjs/core';
import { UserRole } from '../../database/entities/user.entity';

export const Roles = Reflector.createDecorator<UserRole[]>();
