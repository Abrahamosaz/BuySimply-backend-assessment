import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  ParseUUIDPipe,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../common/decorators/role.decorator';
import { CreateUserDto } from './dtos/createUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '../database/typeorm/entities/user.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ApiPaginatedUserAdminResponse } from '../common/decorators/swagger-doc/user/adminGetAllUserPagination.decorator';
import { ApiUserByIdResponse } from '../common/decorators/swagger-doc/user/userGetById.decorator';
import { ApiAdminCreateUserResponse } from '../common/decorators/swagger-doc/user/adminCreateUser.decorator';
import { RoleGuard } from '../common/guards/role.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiPaginatedUserAdminResponse()
  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  async getUsers(@Query() paginationDto: PaginationDto) {
    return this.userService.getUsers(paginationDto);
  }

  @Get(':id')
  @ApiUserByIdResponse()
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  @ApiAdminCreateUserResponse()
  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
