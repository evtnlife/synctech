import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiCommonResponses() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad request. Validation failed.',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized. Missing or invalid token.',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict. Resource already exists.',
    }),
    ApiResponse({ status: 500, description: 'Internal server error.' }),
  );
}
