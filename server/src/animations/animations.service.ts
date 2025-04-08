import { Injectable } from '@nestjs/common';
import { Animation } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from 'src/cache/cache.service';
import { CreateDto, UpdateDto } from './animations.dto';

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

  getAnimationById(id: number): Promise<Animation | null> {
    return this.prisma.animation.findUnique({
      where: { id },
      include: {
        Scene: {
          take: 10,
          orderBy: {
            updatedAt: 'asc',
          },
        },
      },
    });
  }

  async create(data: CreateDto): Promise<Animation> {
    const response = await this.prisma.animation.create({ data });
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
