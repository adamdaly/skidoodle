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
import { AuthGuard } from 'src/auth/auth.guard';
import { FileService } from 'src/file/file.service';
import { FramesService } from './frames.service';
import { CreateDto, UpdateDto } from './frames.dto';

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
    @Body('length', ParseIntPipe) length: CreateDto['length'],
    @Body('index', ParseIntPipe) index: CreateDto['index'],
    @Body('sceneid', ParseIntPipe) sceneid: number,
  ) {
    const filename = await this.fileService.write(file);
    return this.framesService.create({
      filename,
      index,
      length,
      sceneid,
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      await this.fileService.overwrite(file);
    }
    return this.framesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.framesService.delete(id);
  }
}
