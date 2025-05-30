import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ApiSecurityDecorator } from '../apiSecurity.decorator';

export function ApiPaginatedUserAdminResponse() {
  return applyDecorators(
    ApiOperation({ summary: 'Fetch all the users (admin only)' }),
    ApiResponse({
      status: 200,
      description: 'Users fetched successfully',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Users fetched successfully' },
          statusCode: { type: 'number', example: 200 },
          data: {
            type: 'object',
            properties: {
              users: { type: 'array', items: { type: 'object' } },
              pagination: {
                type: 'object',
                properties: {
                  total: { type: 'number' },
                  page: { type: 'number' },
                  limit: { type: 'number' },
                  totalPages: { type: 'number' },
                },
              },
            },
          },
        },
      },
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number (default: 1)',
      minimum: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Number of items per page (default: 10)',
      minimum: 1,
    }),
    ApiSecurityDecorator(),
  );
}
