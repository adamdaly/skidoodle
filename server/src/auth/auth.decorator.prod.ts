import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { Request } from 'express';
import { ExecutionContext } from '@nestjs/common';

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID ?? '',
  tokenUse: 'access',
  clientId: process.env.COGNITO_CLIENT_ID ?? '',
});

export default async function (data: unknown, ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest<Request>();
  const accessToken = request.headers['authorization']?.split(' ')?.[1];

  if (accessToken) {
    const payload = await verifier.verify(accessToken);

    return payload;
  }
  return null;
}
