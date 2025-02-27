import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { post } from 'src/api';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';

type RegisterPayload = {
  username: string;
  password: string;
};

type SignInPayload = {
  username: string;
  password: string;
};

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('register')
  async register(@Body() payload: RegisterPayload) {
    const response = await post('http://auth-server:3000/register', payload);
    return response.data;
  }

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() payload: SignInPayload) {
    const response = await post('http://auth-server:3000/sign-in', payload);

    return response.data;
  }
}
