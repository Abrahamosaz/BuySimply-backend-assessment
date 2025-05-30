import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ApiSecurityDecorator } from '../apiSecurity.decorator';

export function ApiAdminCreateUserResponse() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a user (admin only)' }),
    ApiResponse({
      status: 201,
      description: 'User created successfully',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'User created successfully',
          },
          statusCode: {
            type: 'number',
            example: 201,
          },
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
              role: {
                type: 'string',
                enum: ['admin', 'user'],
                example: 'user',
              },
              isActive: { type: 'boolean', example: true },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Invalid input data' },
          error: { type: 'string', example: 'Bad Request' },
          statusCode: { type: 'number', example: 400 },
        },
      },
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - Email already exists',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'User with that email already exists',
          },
          error: { type: 'string', example: 'Conflict' },
          statusCode: { type: 'number', example: 409 },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example:
              'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
          },
          error: { type: 'string', example: 'Bad Request' },
          statusCode: { type: 'number', example: 400 },
        },
      },
    }),
    ApiSecurityDecorator(),
  );
}
