import { Controller, Get } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/shared/decorators/decorator-user';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/recents')
  getRecents(@User() user: Request['user']) {
    return this.userService.getRecents(user.userId);
  }
}
