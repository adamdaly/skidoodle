import { Module } from '@nestjs/common';
import { AnimationsController } from './animations.controller';
import { AnimationsService } from './animations.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AnimationsController],
  providers: [PrismaService, AnimationsService],
})
export class AnimationsModule {
  constructor(private readonly animationsService: AnimationsService) {}
}
