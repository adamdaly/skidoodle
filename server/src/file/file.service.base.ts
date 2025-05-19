import { GetObjectOutput } from 'aws-sdk/clients/s3';

export abstract class FileServiceBase {
  abstract get(filename: string): Promise<GetObjectOutput>;
  abstract write(file: Express.Multer.File): Promise<string>;
  abstract overwrite(file: Express.Multer.File): Promise<string>;
}
