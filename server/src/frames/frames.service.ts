import { Injectable } from '@nestjs/common';
import { Frame, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FramesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.FrameCreateInput) {
    return this.prisma.frame.create({ data });
  }

  update(id: number, data: Prisma.FrameUpdateInput) {
    return this.prisma.frame.update({ where: { id }, data });
  }

  delete(id: number): Promise<Frame> {
    return this.prisma.frame.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
