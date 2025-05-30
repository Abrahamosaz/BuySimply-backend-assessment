import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiSecurityDecorator } from '../apiSecurity.decorator';

export function ApiGetTaskByIdResponse() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a task by id' }),
    ApiResponse({
      status: 200,
      description: 'Task fetched successfully',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Task fetched successfully' },
          statusCode: { type: 'number', example: 200 },
          data: { type: 'object' },
        },
      },
    }),

    ApiResponse({
      status: 404,
      description: 'Task not found',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Task with id does not exist' },
          error: { type: 'string', example: 'Not Found' },
          statusCode: { type: 'number', example: 404 },
        },
      },
    }),
    ApiSecurityDecorator(),
  );
}
