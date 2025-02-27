import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FramesService } from './frames.service';
import { Prisma } from '@prisma/client';

@Controller('frames')
export class FramesController {
  constructor(private readonly framesService: FramesService) {}

  @Post()
  create(@Body() data: Prisma.FrameCreateInput) {
    return this.framesService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: Prisma.FrameUpdateInput) {
    return this.framesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.framesService.delete(id);
  }
}
