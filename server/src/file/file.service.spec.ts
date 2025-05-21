import S3 from 'aws-sdk/clients/s3';

import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { FileModule } from './file.module';
import { Readable } from 'stream';
import { AWSError } from 'aws-sdk';

const mockPutObject = jest.fn(
  (
    params: S3.Types.PutObjectRequest,
    callback?: (err?: AWSError, data?: S3.Types.PutObjectOutput) => void,
  ) => {
    callback?.();
  },
);
const mockGetObject = jest.fn(
  (
    params: S3.Types.PutObjectRequest,
    callback?: (err?: AWSError, data?: S3.Types.PutObjectOutput) => void,
  ) => {
    callback?.();
  },
);

jest.mock('aws-sdk/clients/s3', () => {
  const mockS3 = jest.fn().mockImplementation(() => ({
    getObject: mockGetObject,
    putObject: mockPutObject,
  }));

  return mockS3;
});

describe('FileService', () => {
  let service: FileService;

  const file: Express.Multer.File = {
    fieldname: 'fieldname',
    originalname: 'originalname.png',
    encoding: 'utf-8',
    mimetype: 'image/png',
    size: 0,
    stream: new Readable(),
    destination: '',
    filename: 'filename.png',
    path: '',
    buffer: Buffer.from(''),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FileModule],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should use the S3.putObject function when the write function is called', async () => {
    await service.write(file);

    expect(mockPutObject).toHaveBeenCalledWith(
      {
        Bucket: expect.any(String) as string,
        Key: expect.any(String) as string,
        Body: file.buffer,
      },
      expect.any(Function),
    );
  });

  it('should use the S3.putObject function when the overwrite function is called', async () => {
    await service.overwrite(file);

    expect(mockPutObject).toHaveBeenCalledWith(
      {
        Bucket: expect.any(String) as string,
        Key: file.originalname,
        Body: file.buffer,
      },
      expect.any(Function),
    );
  });

  it('should use the S3.getObject function when the get function is called', async () => {
    await service.get(file.filename);

    expect(mockGetObject).toHaveBeenCalledWith(
      {
        Bucket: expect.any(String) as string,
        Key: file.filename,
      },
      expect.any(Function),
    );
  });
});
