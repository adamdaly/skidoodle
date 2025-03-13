import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { refresh, verify } from 'src/api/auth';

jest.mock('src/api/auth');

describe('AuthGuard', () => {
  const guard = new AuthGuard();

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return false if no access token is provided', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: undefined, // 'Bearer 0123456789abcdefg'
          },
          signedCookies: {
            refresh_token: undefined,
          },
        }),

        getResponse: () => ({}),
      }),
      getHandler: () => {},
    } as ExecutionContext;

    expect(await guard.canActivate(context)).toBe(false);
  });

  it('should return false if the verify api request throws an error and there is no refresh token', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer 0123456789abcdefg',
          },
          signedCookies: {
            refresh_token: undefined,
          },
        }),

        getResponse: () => ({}),
      }),
      getHandler: () => {},
    } as ExecutionContext;

    jest
      .mocked(verify)
      .mockImplementation(() => Promise.reject(new Error('error')));

    expect(await guard.canActivate(context)).toBe(false);
  });
});
