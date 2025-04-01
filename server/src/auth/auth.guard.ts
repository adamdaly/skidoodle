import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'src/api/auth';

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

    const accessToken =
      request.signedCookies['access_token'] ?? request.cookies['access_token'];

    if (!accessToken) {
      return false;
    }

    try {
      await verify(accessToken);
      return true;
    } catch (e) {
      console.log('accessToken failed', e);
    }

    return false;
  }
}
