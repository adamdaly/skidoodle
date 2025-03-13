import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { refresh, verify } from 'src/api/auth';

declare module 'express' {
  interface Request {
    cookies: Record<string, string | false | undefined>;
    signedCookies: Record<string, string | false | undefined>;
  }
}
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const response = context.switchToHttp().getResponse<Response>();
    const accessToken = request.headers['authorization']?.split(' ')[1];
    const refreshToken =
      request.signedCookies['refresh_token'] ??
      request.cookies['refresh_token'];

    if (!accessToken) {
      return false;
    }

    try {
      await verify(accessToken);
    } catch (e) {
      console.log('accessToken failed', e);

      if (!refreshToken) {
        return false;
      }

      try {
        const result = await refresh();

        response.setHeader(
          'authorization',
          `Bearer ${result.data.accessToken}`,
        );

        response.cookie('refresh_token', result.data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          signed: true,
        });
      } catch (e) {
        console.log('refreshToken failed', e);
        return false;
      }
    }

    return true;
  }
}
