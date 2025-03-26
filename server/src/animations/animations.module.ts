/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScenesService } from 'src/scenes/scenes.service';
import { AnimationsController } from './animations.controller';
import { AnimationsService } from './animations.service';

@Module({
  controllers: [AnimationsController],
  providers: [PrismaService, AnimationsService, CacheService, ScenesService],
})
export class AnimationsModule {
  constructor(private readonly animationsService: AnimationsService) {}
}
