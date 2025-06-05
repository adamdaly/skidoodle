import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { authService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const accessToken = request.headers.authorization?.split(' ')?.[1];

    if (accessToken) {
      try {
        await authService.verify(accessToken);
        return true;
      } catch {
        /* empty */
      }
    }

    return false;
  }
}
