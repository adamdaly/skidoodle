import { Injectable } from '@nestjs/common';
// import { User, Prisma, Animation } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // createUser(data: Prisma.UserCreateInput): Promise<User> {
  //   return this.prisma.user.create({ data });
  // }

  // getUserById(id: number): Promise<User | null> {
  //   return this.prisma.user.findUnique({
  //     where: { id },
  //   });
  // }

  // getUserAnimationsById(userid: number): Promise<Animation[]> {
  //   return this.prisma.animation.findMany({
  //     where: { userid },
  //   });
  // }

  // delete(id: number): Promise<User> {
  //   return this.prisma.user.update({
  //     where: { id },
  //     data: { isDeleted: true },
  //   });
  // }
}
