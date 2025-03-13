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
            authorization: undefined,
          },
          signedCookies: {
            refresh_token: undefined,
          },
          cookies: {},
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
          cookies: {},
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

  it('should return false if the verify api request completes ok and the refresh api call fails', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer asdf1234',
          },
          signedCookies: {
            refresh_token: 'asdf1234',
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

    jest
      .mocked(refresh)
      .mockImplementation(() => Promise.reject(new Error('error')));

    expect(await guard.canActivate(context)).toBe(false);
  });

  it('should return update the authorization header and refresh cookie when refresh request', async () => {
    const mockSetHeader = jest.fn();
    const mockCookie = jest.fn();

    const responseData = {
      accessToken: 'asdf1234',
      refreshToken: 'asdf5678',
    };

    jest
      .mocked(verify)
      .mockImplementation(() => Promise.reject(new Error('error')));

    // @ts-expect-error - Testing
    jest.mocked(refresh).mockImplementation(() =>
      Promise.resolve({
        data: responseData,
      }),
    );

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${responseData.accessToken}`,
          },
          signedCookies: {
            refresh_token: responseData.refreshToken,
          },
          cookies: {},
        }),

        getResponse: () => ({
          setHeader: mockSetHeader,
          cookie: mockCookie,
        }),
      }),
      getHandler: () => ({}),
    } as ExecutionContext;

    await guard.canActivate(context);

    expect(mockSetHeader).toHaveBeenCalledWith(
      'authorization',
      `Bearer ${responseData.accessToken}`,
    );

    expect(mockCookie).toHaveBeenCalledWith(
      'refresh_token',
      responseData.refreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        signed: true,
      },
    );
  });
});
