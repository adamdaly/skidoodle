import { Injectable } from '@nestjs/common';
import { Animation } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from 'src/cache/cache.service';
import { CreateDto, UpdateDto } from './animations.dto';
import { DMMF } from '@prisma/client/runtime/library';

@Injectable()
export class AnimationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  createCacheKey(key: string | number) {
    return `${CacheService.KEY_ANIMATION}_${key}`;
  }

  async resetAnimationCache(id: string | number) {
    const cacheKey = this.createCacheKey(id);
    return await this.cacheService.reset(cacheKey);
  }

  getAnimationById(
    id: number,
    sceneTake?: number,
    sceneSkip?: number,
    sceneSortOrder: DMMF.SortOrder = 'asc',
    frameTake?: number,
    frameSkip?: number,
    frameSortOrder: DMMF.SortOrder = 'asc',
  ): Promise<Animation | null> {
    return this.prisma.animation.findUnique({
      where: { id },
      include: {
        Scene: {
          take: sceneTake,
          skip: sceneSkip,
          orderBy: {
            updatedAt: sceneSortOrder,
          },
          select: {
            id: true,
            name: true,
            userid: true,
            createdAt: true,
            updatedAt: true,
            Frame: {
              take: frameTake,
              skip: frameSkip,
              orderBy: {
                updatedAt: frameSortOrder,
              },
            },
          },
        },
      },
    });
  }

  async create(data: CreateDto & { userid: string }): Promise<Animation> {
    const response = await this.prisma.animation.create({
      data,
      include: { Scene: true },
    });
    await this.resetAnimationCache(response.userid);
    return response;
  }

  async update(id: number, data: UpdateDto): Promise<Animation> {
    const response = await this.prisma.animation.update({
      where: { id },
      data,
    });

    await this.resetAnimationCache(response.id);
    await this.resetAnimationCache(response.userid);

    return response;
  }

  async delete(id: number): Promise<Animation> {
    const response = await this.prisma.animation.update({
      where: { id },
      data: { isDeleted: true, updatedAt: new Date() },
    });

    await this.resetAnimationCache(response.id);
    await this.resetAnimationCache(response.userid);

    return response;
  }
}
