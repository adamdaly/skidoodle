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

import { Animation } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { CreateDto, UpdateDto } from './animations.dto';
import { AnimationsService } from './animations.service';

@Controller('animations')
@UseGuards(AuthGuard)
export class AnimationsController {
  constructor(private readonly animationsService: AnimationsService) {}

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

  @Get('users/:userid')
  getAnimationsByUserId(
    @Param('userid') userid: string,
  ): Promise<Animation[] | null> {
    return this.animationsService.getAnimationsByUserId(userid);
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
