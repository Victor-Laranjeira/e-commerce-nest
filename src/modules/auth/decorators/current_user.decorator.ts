import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Number => {
    const request = context.switchToHttp().getRequest();
    return Number(request.params.customerId);
  },
);
