import { Injectable } from '@nestjs/common';
import { getFile /**, saveFile */, updateFile } from 'src/api/files';
import { FileServiceBase } from './file.service.base';
import { GetObjectOutput } from 'aws-sdk/clients/s3';

@Injectable()
export class FileService implements FileServiceBase {
  async get(filename: string) {
    const data = await getFile(filename);
    return data as GetObjectOutput;
  }
  async write(file: Express.Multer.File) {
    const fileName = `${crypto.randomUUID()}.${file.originalname.split('.')[1]}`;
    // await saveFile(fileName, file);
    await Promise.resolve('');
    return fileName;
  }
  async overwrite(file: Express.Multer.File) {
    await updateFile(file);
    return file.originalname;
  }
}
