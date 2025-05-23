import jwt from 'jsonwebtoken';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const guard = new AuthGuard();

  process.env = {
    ACCESS_TOKEN_SECRET: 'ACCESS_TOKEN_SECRET',
  };

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return false if no access token is provided', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: undefined,
          },
        }),

        getResponse: () => ({}),
      }),
      getHandler: () => {},
    } as ExecutionContext;

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return false if the verification fails', () => {
    const accessToken = jwt.sign(
      {
        sub: 'asdf-1234',
      },
      'someSecretKey',
    );

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          cookies: {},
        }),

        getResponse: () => ({}),
      }),
      getHandler: () => {},
    } as ExecutionContext;

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return true if the verification is successful', () => {
    const accessToken = jwt.sign(
      {
        sub: 'asdf-1234',
      },
      process.env.ACCESS_TOKEN_SECRET ?? '',
    );

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          cookies: {},
        }),

        getResponse: () => ({}),
      }),
      getHandler: () => {},
    } as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
  });
});
