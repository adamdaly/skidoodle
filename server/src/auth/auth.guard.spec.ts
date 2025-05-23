import jwt from 'jsonwebtoken';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { verify } from 'src/api/auth.api';

jest.mock('src/api/auth.api');

describe('AuthGuard', () => {
  const guard = new AuthGuard();

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

  it('should return false if the verify api request throws an error and there is no refresh token', () => {
    const accessToken = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET ?? '');

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

    jest
      .mocked(verify)
      .mockImplementation(() => Promise.reject(new Error('error')));

    expect(guard.canActivate(context)).toBe(false);
  });
});
