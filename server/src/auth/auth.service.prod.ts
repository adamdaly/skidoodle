import { CognitoJwtVerifier } from 'aws-jwt-verify';

export default class AuthServiceProd {
  verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.COGNITO_USER_POOL_ID ?? '',
    tokenUse: 'access',
    clientId: process.env.COGNITO_CLIENT_ID ?? '',
  });

  verify(accessToken: string) {
    return this.verifier.verify(accessToken);
  }
}
