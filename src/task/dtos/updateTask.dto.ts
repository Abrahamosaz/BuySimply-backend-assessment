import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  Priority,
  TaskStatus,
} from '../../database/typeorm/entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Task 1',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Task 1 description',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    example: 'todo',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    description: 'The priority of the task',
    example: 'low',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty({
    description: 'The due date of the task',
    example: '2021-01-01',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    description: 'The user id to assign the task to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  assignedTo: string;
}
