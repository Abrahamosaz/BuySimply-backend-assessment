import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Priority } from '../../database/typeorm/entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Task 1',
    type: String,
  })
  @IsNotEmpty()
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
    description: 'The priority of the task (either low, medium, or high)',
    example: 'low',
    type: String,
  })
  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty({
    description: 'The due date of the task',
    example: '2021-01-01',
    type: String,
  })
  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}
