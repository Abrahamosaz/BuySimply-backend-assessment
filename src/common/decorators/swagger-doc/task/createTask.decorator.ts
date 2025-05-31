import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ApiSecurityDecorator } from '../apiSecurity.decorator';

export function ApiCreateTaskResponse() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a task' }),
    ApiResponse({
      status: 201,
      description: 'Task created successfully',
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
              assignedTo: {
                type: 'object',
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
