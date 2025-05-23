import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const userDecoratorFn =
      process.env.NODE_ENV === 'development'
        ? await import('./auth.decorator.local').then(
            (module) => module.default,
          )
        : await import('./auth.decorator.prod').then(
            (module) => module.default,
          );

    return await userDecoratorFn(data, ctx);
  },
);
