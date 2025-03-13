import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileService } from 'src/file/file.service';
import { FramesService } from './frames.service';

@Controller('frames')
@UseGuards(AuthGuard)
export class FramesController {
  constructor(
    private readonly framesService: FramesService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('length', ParseIntPipe) length: Prisma.FrameCreateInput['length'],
    @Body('index', ParseIntPipe) index: Prisma.FrameCreateInput['index'],
    @Body('sceneid', ParseIntPipe) sceneid: number,
  ) {
    const filename = await this.fileService.write(file);
    return this.framesService.create({
      filename,
      index,
      length,
      Scene: { connect: { id: sceneid } },
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body('length', ParseIntPipe) length: Prisma.FrameUpdateInput['length'],
    @Body('index', ParseIntPipe) index: Prisma.FrameUpdateInput['index'],
  ) {
    await this.fileService.overwrite(file);
    return this.framesService.update(id, {
      length,
      index,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.framesService.delete(id);
  }
}
