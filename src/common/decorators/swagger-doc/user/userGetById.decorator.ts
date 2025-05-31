import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiSecurityDecorator } from '../apiSecurity.decorator';

export function ApiUserByIdResponse() {
  return applyDecorators(
    ApiOperation({ summary: 'Fetch a user by id (user only)' }),
    ApiResponse({
      status: 200,
      description: 'Fetch a user by id',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'User fetched successfully' },
          statusCode: { type: 'number', example: 200 },
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '123e4567-e89b-12d3-a456-426614174000',
              },
              email: { type: 'string', example: 'user@example.com' },
              firstName: { type: 'string', example: 'John' },
              lastName: { type: 'string', example: 'Doe' },
              role: { type: 'string', example: 'user' },
              isActive: { type: 'boolean', example: true },
              createdAt: {
                type: 'string',
                example: '2021-01-01T00:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                example: '2021-01-01T00:00:00.000Z',
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'User not found' },
          error: { type: 'string', example: 'Not Found' },
          statusCode: { type: 'number', example: 404 },
        },
      },
    }),
    ApiSecurityDecorator(),
  );
}
