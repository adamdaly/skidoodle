import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const accessToken = request.headers.authorization?.split(' ')?.[1];

    if (accessToken) {
      try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET ?? '');
        return true;
      } catch {
        /* empty */
      }
    }

    return false;
  }
}
