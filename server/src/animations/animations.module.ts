/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/cache/cache.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnimationsController } from './animations.controller';
import { AnimationsService } from './animations.service';

@Module({
  controllers: [AnimationsController],
  providers: [PrismaService, AnimationsService, CacheService, JwtService],
})
export class AnimationsModule {
  constructor(private readonly animationsService: AnimationsService) {}
}
