import { Injectable } from '@nestjs/common';
import { Prisma, Scene } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScenesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.SceneCreateInput) {
    return this.prisma.scene.create({ data });
  }

  getScenesByAnimationId(id: number): Promise<Scene[]> {
    return this.prisma.scene.findMany({
      where: { animationid: id },
    });
  }

  getSceneById(id: number): Promise<Scene | null> {
    return this.prisma.scene.findFirst({
      where: { id },
      include: { Frame: true },
    });
  }

  update(id: number, data: Prisma.SceneUpdateInput) {
    return this.prisma.scene.update({
      where: { id },
      data,
    });
  }

  delete(id: number): Promise<Scene> {
    return this.prisma.scene.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
