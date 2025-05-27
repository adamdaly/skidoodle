import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import authDecoratorLocal from './auth.decorator.local';
import authDecoratorProd from './auth.decorator.prod';

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const userDecoratorFn =
      process.env.NODE_ENV === 'development'
        ? authDecoratorLocal
        : authDecoratorProd;

    return await userDecoratorFn(data, ctx);
  },
);
