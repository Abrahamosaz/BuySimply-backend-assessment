import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiSecurityDecorator } from '../apiSecurity.decorator';

export function ApiDeleteUserResponse() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a user (admin only)' }),
    ApiResponse({ status: 200, description: 'User deleted successfully' }),
    ApiSecurityDecorator(),
  );
}
