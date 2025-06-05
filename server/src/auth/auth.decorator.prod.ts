import { Request } from 'express';
import { ExecutionContext } from '@nestjs/common';
import { authService } from './auth.service';

export default async function (data: unknown, ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest<Request>();
  const accessToken = request.headers['authorization']?.split(' ')?.[1];

  if (accessToken) {
    const payload = await authService.verify(accessToken);
    return payload;
  }
  return null;
}
