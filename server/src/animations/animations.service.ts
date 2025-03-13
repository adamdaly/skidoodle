import { Injectable } from '@nestjs/common';
import { Animation, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnimationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.AnimationCreateInput): Promise<Animation> {
    return this.prisma.animation.create({ data });
  }

  getAnimationById(id: number): Promise<Animation | null> {
    return this.prisma.animation.findUnique({
      where: { id },
      include: {
        Scene: true,
      },
    });
  }

  update(id: number, data: Prisma.AnimationUpdateInput): Promise<Animation> {
    return this.prisma.animation.update({
      where: { id },
      data,
    });
  }

  delete(id: number): Promise<Animation> {
    return this.prisma.animation.update({
      where: { id },
      data: { isDeleted: true, updatedAt: new Date() },
    });
  }
}
