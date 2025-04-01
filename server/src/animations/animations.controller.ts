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
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Animation } from '@prisma/client';
import { User } from 'src/shared/decorators/decorator-user';
import { AuthGuard } from '../auth/auth.guard';
import { CreateDto, UpdateDto } from './animations.dto';
import { AnimationsService } from './animations.service';

@Controller('animations')
@UseGuards(AuthGuard)
export class AnimationsController {
  constructor(
    private readonly animationsService: AnimationsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  create(@Body() data: CreateDto): Promise<Animation> {
    return this.animationsService.create(data);
  }

  @Get('')
  async getAnimationsByUserId(
    @User() user: Request['user'],
  ): Promise<Animation[] | null> {
    return this.animationsService.getAnimationsByUserId(user.userId);
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
    @Body() data: UpdateDto,
  ): Promise<Animation> {
    return this.animationsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Animation> {
    return this.animationsService.delete(id);
  }
}
