import { Injectable } from '@nestjs/common';
import { saveFile, updateFile } from 'src/api/files';

@Injectable()
export class FileService {
  async write(file: Express.Multer.File) {
    const fileName = `${crypto.randomUUID()}.${file.originalname.split('.')[1]}`;
    await saveFile(fileName, file);
    return fileName;
  }
  async overwrite(file: Express.Multer.File) {
    await updateFile(file);
  }
}
