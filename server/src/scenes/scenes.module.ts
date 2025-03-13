/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScenesService } from './scenes.service';
import { ScenesController } from './scenes.controller';

@Module({
  controllers: [ScenesController],
  providers: [ScenesService, PrismaService],
})
export class ScenesModule {}
