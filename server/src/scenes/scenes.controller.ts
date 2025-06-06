import { JwtPayload } from 'jsonwebtoken';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/auth.decorator';
import { CreateDto, UpdateDto } from './scenes.dto';
import { ScenesService } from './scenes.service';

@Controller('scenes')
@UseGuards(AuthGuard)
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) {}

  @Post()
  create(@User() user: JwtPayload, @Body() data: CreateDto) {
    return this.scenesService.create({
      ...data,
      userid: user.sub as string,
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
