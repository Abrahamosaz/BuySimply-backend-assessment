import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiSecurityDecorator } from '../apiSecurity.decorator';

export function ApiDeleteTaskResponse() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a task' }),
    ApiResponse({ status: 200, description: 'Task deleted successfully' }),
    ApiSecurityDecorator(),
  );
}
