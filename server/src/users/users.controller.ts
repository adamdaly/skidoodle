import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get(':id')
  // getUserById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
  //   return this.usersService.getUserById(id);
  // }

  // @Post()
  // createUser(@Body('name') name: string): Promise<User> {
  //   return this.usersService.createUser({ name });
  // }

  // @Get(':id/animations')
  // getUserAnimationsById(
  //   @Param('id', ParseIntPipe) id: number,
  // ): Promise<Animation[]> {
  //   return this.usersService.getUserAnimationsById(id);
  // }

  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //   return this.usersService.delete(id);
  // }
}
