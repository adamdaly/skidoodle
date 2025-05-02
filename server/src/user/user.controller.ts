import { Request } from 'express';
import { Controller, Get } from '@nestjs/common';
import { Animation } from '@prisma/client';
import { User } from 'src/shared/decorators/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('recents')
  getRecents(@User() user: Request['user']) {
    return this.userService.getRecents(user.userId);
  }

  @Get('animations')
  async getAnimationsByUserId(
    @User() user: Request['user'],
  ): Promise<Animation[] | null> {
    return this.userService.getAnimationsByUserId(user.userId);
  }
}
