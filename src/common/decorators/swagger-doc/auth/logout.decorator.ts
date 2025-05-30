import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiSecurityDecorator } from '../apiSecurity.decorator';

export function ApiLogoutResponse() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Logout successful',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Logout successful' },
          statusCode: { type: 'number', example: 200 },
        },
      },
    }),
    ApiSecurityDecorator(),
  );
}
