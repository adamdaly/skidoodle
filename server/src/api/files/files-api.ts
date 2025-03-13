import { MulterError } from 'multer';
import { post, patch } from '../api';

export const saveFile = (fileName: string, file: Express.Multer.File) => {
  if (file instanceof MulterError) {
    throw file;
  }

  const formData = new FormData();

  formData.append('file', new Blob([file.buffer]), fileName);

  return post<void>('http://file-store:3000/', formData);
};

export const updateFile = (file: Express.Multer.File) => {
  if (file instanceof MulterError) {
    throw file;
  }

  const formData = new FormData();

  formData.append('file', new Blob([file.buffer]), file.originalname);

  return patch<void>('http://file-store:3000/', formData);
};
