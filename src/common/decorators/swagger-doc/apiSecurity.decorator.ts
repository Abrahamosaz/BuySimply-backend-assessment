import { applyDecorators } from '@nestjs/common';
import { ApiSecurity, ApiCookieAuth } from '@nestjs/swagger';

export function ApiSecurityDecorator() {
  return applyDecorators(
    ApiSecurity('x-api-key'),
    ApiCookieAuth('access_token'),
  );
}
