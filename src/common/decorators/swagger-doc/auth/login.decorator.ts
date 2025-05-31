import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';

export function ApiLoginResponse() {
  return applyDecorators(
    ApiOperation({ summary: 'User login' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Login successful',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Login successful' },
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
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid credentials',
    }),
    ApiSecurity('x-api-key'),
  );
}
