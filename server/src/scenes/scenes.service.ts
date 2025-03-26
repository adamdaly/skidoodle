import { Injectable } from '@nestjs/common';
import { Scene } from '@prisma/client';
import { DMMF } from '@prisma/client/runtime/library';
import { CacheService } from 'src/cache/cache.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './scenes.dto';

@Injectable()
export class ScenesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  createCacheKey(key: string | number) {
    return `${CacheService.KEY_SCENE}_${key}`;
  }

  async resetCache(id: string | number) {
    const cacheKey = this.createCacheKey(id);
    return await this.cacheService.reset(cacheKey);
  }

  async create(data: CreateDto) {
    const { animationid, ...scene } = data;
    await this.resetCache(animationid);

    return await this.prisma.scene.create({
      data: {
        ...scene,
        Animation: {
          connect: {
            id: animationid,
          },
        },
      },
    });
  }

  getScenesByAnimationId(
    id: number,
    orderBy: keyof Scene = 'updatedAt',
    skip?: number,
    take?: number,
    sortOrder: DMMF.SortOrder = 'desc',
  ): Promise<Scene[]> {
    return this.prisma.scene.findMany({
      where: { animationid: id },
      skip,
      take,
      orderBy: {
        [orderBy]: sortOrder,
      },
      include: {
        Frame: {
          take: 1,
          select: {
            filename: true,
          },
        },
      },
    });
  }

  getSceneById(id: number): Promise<Scene | null> {
    const cacheKey = this.createCacheKey(id);

    return this.cacheService.cacheFromResponse<Scene | null>(
      cacheKey,
      async () =>
        await this.prisma.scene.findFirst({
          where: { id },
          include: {
            Frame: {
              orderBy: {
                index: 'asc',
              },
            },
          },
        }),
    );
  }

  async update(id: number, data: UpdateDto) {
    const response = await this.prisma.scene.update({
      where: { id },
      data,
    });

    await this.resetCache(response.id);
    await this.resetCache(response.animationid);

    return response;
  }

  async delete(id: number): Promise<Scene> {
    const response = await this.prisma.scene.update({
      where: { id },
      data: { isDeleted: true },
    });

    await this.resetCache(response.id);
    await this.resetCache(response.animationid);

    return response;
  }
}
