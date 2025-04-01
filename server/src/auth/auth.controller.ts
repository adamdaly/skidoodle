import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  register,
  RegisterPayload,
  signIn,
  SignInPayload,
  verify,
} from 'src/api/auth';

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
  async signIn(@Body() payload: SignInPayload, @Res() res: Response) {
    const response = await signIn(payload);

    // res.cookie('access_token', response.data.accessToken, {
    //   httpOnly: true,
    //   secure: false, // process.env.NODE_ENV === 'production',
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    //   signed: true,
    //   sameSite: 'lax', // process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    // });

    // res.cookie('refresh_token', response.data.refreshToken, {
    //   httpOnly: true,
    //   secure: false, // process.env.NODE_ENV === 'production',
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    //   signed: true,
    //   sameSite: 'lax', // process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    // });

    return res.status(200).json({
      id: response.data.id,
      username: response.data.username,
    });
  }
}
