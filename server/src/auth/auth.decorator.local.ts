import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

export default async function (data: unknown, ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest<Request>();
  const accessToken = request.headers['authorization']?.split(' ')?.[1];

  if (accessToken) {
    const payload = jwt.decode(accessToken);
    return Promise.resolve(payload);
  }
  return Promise.resolve(null);
}
