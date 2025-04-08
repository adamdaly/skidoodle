import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from './auth.middleware';

describe('AuthMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthMiddleware(new JwtService())).toBeDefined();
  });
});
