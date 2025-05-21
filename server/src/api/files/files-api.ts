import { MulterError } from 'multer';
import { get, post, patch } from '../api';

export const getFile = (filename: string) => {
  return get<File>(`http://file-store:3000/frames/${filename}`).then(
    (response) => response.data,
  );
};

export const saveFile = (filename: string, file: Express.Multer.File) => {
  if (file instanceof MulterError) {
    throw file;
  }

  const formData = new FormData();

  formData.append('file', new Blob([file.buffer]), filename);

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
