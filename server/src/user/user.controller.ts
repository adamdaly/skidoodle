import { Controller, Get, UseGuards } from '@nestjs/common';
import { Animation } from '@prisma/client';
import { UserService } from './user.service';

import { JwtPayload } from 'jsonwebtoken';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/auth.decorator';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('animations')
  async getAnimationsByUserId(
    @User() user: JwtPayload,
  ): Promise<Animation[] | null> {
    return this.userService.getAnimationsByUserId(user.sub as string);
  }

  @Get('recents')
  getRecents(@User() user: JwtPayload) {
    return this.userService.getRecents(user.sub as string);
  }
}
