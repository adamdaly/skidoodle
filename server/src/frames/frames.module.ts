/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FramesService } from './frames.service';
import { FramesController } from './frames.controller';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  controllers: [FramesController],
  providers: [FramesService, PrismaService],
})
export class FramesModule {}
