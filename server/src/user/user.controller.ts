import { Controller, Get } from '@nestjs/common';
import { Animation } from '@prisma/client';
import { Authentication, CognitoUser } from '@nestjs-cognito/auth';
import type { CognitoJwtPayload } from '@nestjs-cognito/core';
import { UserService } from './user.service';

@Authentication()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('animations')
  async getAnimationsByUserId(
    @CognitoUser() user: CognitoJwtPayload,
  ): Promise<Animation[] | null> {
    return this.userService.getAnimationsByUserId(user.username as string);
  }

  @Get('recents')
  getRecents(@CognitoUser() user: CognitoJwtPayload) {
    return this.userService.getRecents(user.username as string);
  }
}
