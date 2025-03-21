/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/file/file.service';
import { FramesService } from './frames.service';
import { FramesController } from './frames.controller';

@Module({
  controllers: [FramesController],
  providers: [FramesService, PrismaService, FileService],
})
export class FramesModule {}
