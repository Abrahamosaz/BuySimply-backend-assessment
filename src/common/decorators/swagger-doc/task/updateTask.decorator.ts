import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiSecurityDecorator } from '../apiSecurity.decorator';

export function ApiUpdateTaskResponse() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Update a task, all the fields are optional, specify the field you want to update. For priority (either low, medium, high), for status (todo, in_progress, completed)',
    }),
    ApiResponse({
      status: 200,
      description: 'Task updated successfully',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          statusCode: { type: 'number' },
          data: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              dueDate: { type: 'string', format: 'date' },
              priority: { type: 'string', enum: ['low', 'medium', 'high'] },
              status: {
                type: 'string',
                enum: ['todo', 'in_progress', 'completed'],
              },
              createdAt: { type: 'string', format: 'date' },
              updatedAt: { type: 'string', format: 'date' },
            },
          },
        },
      },
    }),
    ApiSecurityDecorator(),
  );
}
