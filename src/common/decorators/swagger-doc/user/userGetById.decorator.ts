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
          data: { type: 'object' },
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
