import jwt from 'jsonwebtoken';

export default class AuthServiceLocal {
  verify(accessToken: string) {
    try {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET ?? '');
      return Promise.resolve();
    } catch {
      return Promise.reject(new Error());
    }
  }
}
