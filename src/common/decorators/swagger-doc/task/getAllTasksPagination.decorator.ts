import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ApiSecurityDecorator } from '../apiSecurity.decorator';

export function ApiPaginatedTaskResponse() {
  return applyDecorators(
    ApiOperation({ summary: 'Fetch all the tasks' }),
    ApiResponse({
      status: 200,
      description: 'Tasks fetched successfully',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Tasks fetched successfully' },
          statusCode: { type: 'number', example: 200 },
          data: {
            type: 'object',
            properties: {
              tasks: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    title: { type: 'string' },
                    description: { type: 'string', nullable: true },
                    dueDate: { type: 'string', format: 'date-time' },
                    priority: {
                      type: 'string',
                      enum: ['low', 'medium', 'high'],
                    },
                    status: {
                      type: 'string',
                      enum: ['todo', 'in_progress', 'completed'],
                    },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
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
