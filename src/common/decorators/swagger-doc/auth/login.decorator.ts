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
