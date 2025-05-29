import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../common/decorators/role.decorator';
import { RoleGuard } from '../common/guards/role.guard';
import { CreateUserDto } from './dtos/createUser.dto';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from '../database/typeorm/entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all the users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users fetched successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Users fetched successfully' },
        statusCode: { type: 'number', example: 200 },
      },
    },
  })
  @ApiSecurity('x-api-key')
  @ApiCookieAuth('access_token')
  @Roles([UserRole.ADMIN])
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiSecurity('x-api-key')
  @ApiCookieAuth('access_token')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  @Roles([UserRole.ADMIN])
  @ApiSecurity('x-api-key')
  @ApiCookieAuth('access_token')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
