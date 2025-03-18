import { Injectable } from '@nestjs/common';
import { Frame } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './frames.dto';

@Injectable()
export class FramesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateDto) {
    const { sceneid, ...frame } = data;
    return this.prisma.frame.create({
      data: {
        ...frame,
        Scene: {
          connect: {
            id: sceneid,
          },
        },
      },
    });
  }

  update(id: number, data: UpdateDto) {
    return this.prisma.frame.update({ where: { id }, data });
  }

  delete(id: number): Promise<Frame> {
    return this.prisma.frame.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
