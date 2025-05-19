import { Inject, Injectable, Provider } from '@nestjs/common';

import { FileService as FileServiceLocal } from './file.service.local';
import { FileService as FileServiceProd } from './file.service.prod';
import { FileServiceBase } from './file.service.base';
import { ConfigService } from '@nestjs/config';
import { GetObjectOutput } from 'aws-sdk/clients/s3';

export const FILE_SERVICE_TOKEN = 'FILE_SERVICE';

export const FileServiceProvider: Provider = {
  provide: FILE_SERVICE_TOKEN,
  useFactory: (configService: ConfigService) => {
    return configService.get('NODE_ENV') === 'development'
      ? new FileServiceLocal()
      : new FileServiceProd(new ConfigService());
  },
  inject: [ConfigService],
};

@Injectable()
export class FileService implements FileServiceBase {
  constructor(
    @Inject(FILE_SERVICE_TOKEN)
    private readonly fileService: FileServiceLocal | FileServiceProd,
  ) {}

  get(filename: string): Promise<GetObjectOutput> {
    return this.fileService.get(filename);
  }

  write(file: Express.Multer.File): Promise<string> {
    return this.fileService.write(file);
  }

  overwrite(file: Express.Multer.File): Promise<string> {
    return this.fileService.overwrite(file);
  }
}
