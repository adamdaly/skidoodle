import S3, { GetObjectOutput } from 'aws-sdk/clients/s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FileServiceBase } from './file.service.base';

@Injectable()
export class FileService implements FileServiceBase {
  private readonly s3: S3;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      region: configService.get('AWS_REGION'),
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    });

    this.bucket = configService.get('AWS_BUCKET') ?? '';
  }

  private upload(Key: string, Body: Buffer<ArrayBufferLike>) {
    return new Promise<string>((resolve, reject) => {
      this.s3.putObject(
        {
          Bucket: this.bucket,
          Key,
          Body,
        },
        (error) => {
          if (error) {
            reject(error);
          }

          resolve(Key);
        },
      );
    });
  }

  async get(Key: string): Promise<GetObjectOutput> {
    return new Promise((resolve, reject) => {
      this.s3.getObject(
        {
          Bucket: this.bucket,
          Key,
        },
        (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        },
      );
    });
  }

  async write(file: Express.Multer.File): Promise<string> {
    const filename = `${crypto.randomUUID()}.${file.originalname.split('.')[1]}`;
    return this.upload(filename, file.buffer);
  }

  async overwrite(file: Express.Multer.File): Promise<string> {
    return this.upload(file.originalname, file.buffer);
  }
}
