import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  static readonly KEY_ANIMATION: 'animation';
  static readonly KEY_SCENE: 'scene';
  static readonly KEY_FRAME: 'frame';

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.cacheManager.get(key);

    return cached ? (cached as T) : null;
  }

  async set<T>(key: string, value: T) {
    return await this.cacheManager.set(key, value);
  }

  async reset(key: string) {
    await this.cacheManager.del(key);
  }

  async cacheFromResponse<T>(key: string, callback: () => Promise<T>) {
    const cached = await this.get<T>(key);

    if (cached) {
      return cached;
    }

    const response = await callback();

    await this.set(key, response);

    return response;
  }
}
