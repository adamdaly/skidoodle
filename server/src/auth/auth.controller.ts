import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { register, RegisterPayload, signIn, SignInPayload } from 'src/api/auth';

@Controller()
export class AuthController {
  constructor() {}

  @Post('register')
  async register(@Body() payload: RegisterPayload) {
    const response = await register(payload);
    return response.data;
  }

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() payload: SignInPayload) {
    const response = await signIn(payload);

    return response.data;
  }
}
