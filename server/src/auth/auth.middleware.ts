import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  userId: string;
  username: string;
}

declare module 'express' {
  interface Request {
    user: JwtPayload;
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const cookie =
      req.signedCookies['access_token'] ?? req.cookies['access_token'];

    if (!cookie) {
      return next();
    }

    try {
      const payload = this.jwtService.decode<JwtPayload>(cookie);
      req['user'] = payload;
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
