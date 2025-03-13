import { Injectable } from '@nestjs/common';
import { Animation, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from 'src/cache/cache.service';

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

  async create(data: Prisma.AnimationCreateInput): Promise<Animation> {
    const response = await this.prisma.animation.create({ data });
    await this.resetAnimationCache(response.userid);
    return response;
  }

  async getAnimationById(id: number): Promise<Animation | null> {
    const cacheKey = this.createCacheKey(id);

    return this.cacheService.cacheFromResponse<Animation | null>(
      cacheKey,
      async () =>
        await this.prisma.animation.findUnique({
          where: { id },
          include: {
            Scene: true,
          },
        }),
    );
  }

  async getAnimationsByUserId(userid: string): Promise<Animation[] | null> {
    const cacheKey = this.createCacheKey(userid);

    return this.cacheService.cacheFromResponse<Animation[] | null>(
      cacheKey,
      async () =>
        await this.prisma.animation.findMany({
          where: { userid },
          include: {
            Scene: true,
          },
        }),
    );
  }

  async update(
    id: number,
    data: Prisma.AnimationUpdateInput,
  ): Promise<Animation> {
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
