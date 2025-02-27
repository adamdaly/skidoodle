import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Animation, Prisma } from '@prisma/client';
import { AnimationsService } from './animations.service';

import { AuthGuard } from '../auth/auth.guard';

@Controller('animations')
@UseGuards(AuthGuard)
export class AnimationsController {
  constructor(private readonly animationsService: AnimationsService) {}

  @Post()
  create(@Body() data: Prisma.AnimationCreateInput): Promise<Animation> {
    return this.animationsService.create(data);
  }

  @Get(':id')
  getAnimationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Animation | null> {
    return this.animationsService.getAnimationById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    data: Prisma.AnimationUpdateInput,
  ): Promise<Animation> {
    return this.animationsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Animation> {
    return this.animationsService.delete(id);
  }
}
