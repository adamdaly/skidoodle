/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScenesService } from './scenes.service';
import { ScenesController } from './scenes.controller';

@Module({
  controllers: [ScenesController],
  providers: [ScenesService, PrismaService, CacheService],
})
export class ScenesModule {}
