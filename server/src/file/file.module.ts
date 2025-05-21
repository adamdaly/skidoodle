import { Module } from '@nestjs/common';
import { FileService, FileServiceProvider } from './file.service';
import { ConfigService } from '@nestjs/config';
import { FileController } from './file.controller';

@Module({
  controllers: [FileController],
  providers: [FileServiceProvider, FileService, ConfigService],
  exports: [FileService],
})
export class FileModule {}
