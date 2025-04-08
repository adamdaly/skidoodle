import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Animation, Scene } from '@prisma/client';
import { DMMF } from '@prisma/client/runtime/library';
import { ScenesService } from 'src/scenes/scenes.service';
import { AuthGuard } from '../auth/auth.guard';
import { AnimationsService } from './animations.service';
import { CreateDto, UpdateDto } from './animations.dto';

@Controller('animations')
@UseGuards(AuthGuard)
export class AnimationsController {
  constructor(
    private readonly animationsService: AnimationsService,
    private readonly scenesService: ScenesService,
  ) {}

  @Post()
  create(@Body() data: CreateDto): Promise<Animation> {
    return this.animationsService.create(data);
  }

  @Get(':id')
  getAnimationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Animation | null> {
    return this.animationsService.getAnimationById(id);
  }

  @Get(':id/scenes')
  getScenesByAnimationId(
    @Param('id', ParseIntPipe) id: number,
    @Query('orderBy') orderBy?: keyof Scene,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('sortOrder') sortOrder?: DMMF.SortOrder,
  ): Promise<Scene[] | null> {
    return this.scenesService.getScenesByAnimationId(
      id,
      orderBy,
      skip,
      take,
      sortOrder,
    );
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDto,
  ): Promise<Animation> {
    return this.animationsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Animation> {
    return this.animationsService.delete(id);
  }
}
