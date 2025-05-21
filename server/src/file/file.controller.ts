import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { FileService } from './file.service';
import { Response } from 'express';

@Controller('files')
export class FileController {
  constructor(readonly fileService: FileService) {}

  @Get('/:filename')
  async getFile(@Res() res: Response, @Param('filename') filename: string) {
    const response = await this.fileService.get(filename);

    if (!response) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }

    res.setHeader('Content-type', 'image/png');

    res.send(response.Body);
  }
}
