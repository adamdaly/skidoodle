import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Authentication, CognitoUser } from '@nestjs-cognito/auth';
import { CognitoJwtPayload } from '@nestjs-cognito/core';
import { CreateDto, UpdateDto } from './scenes.dto';
import { ScenesService } from './scenes.service';

@Controller('scenes')
@Authentication()
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) {}

  @Post()
  create(@CognitoUser() user: CognitoJwtPayload, @Body() data: CreateDto) {
    return this.scenesService.create({
      ...data,
      userid: user.username as string,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.scenesService.getSceneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDto) {
    return this.scenesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.scenesService.delete(id);
  }
}
