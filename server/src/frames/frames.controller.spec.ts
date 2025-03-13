import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FramesController } from './frames.controller';
import { FramesService } from './frames.service';
import { FileService } from 'src/file/file.service';

describe('FramesController', () => {
  let controller: FramesController;

  const mockFramesService = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const filename = 'filename.png';

  const mockFileService = {
    write: jest.fn(() => filename),
    overwrite: jest.fn(),
  };

  const file = {};
  const length = 1;
  const index = 2;
  const sceneid = 3;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FramesController],
      providers: [
        {
          provide: FramesService,
          useValue: mockFramesService,
        },
        PrismaService,
        {
          provide: FileService,
          useValue: mockFileService,
        },
      ],
    }).compile();

    controller = module.get<FramesController>(FramesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the FramesService.create method with Prisma.FrameCreateInput payload when the create  method is called', async () => {
    const payload: Parameters<typeof controller.create> = [
      file as unknown as Express.Multer.File,
      length,
      index,
      sceneid,
    ];

    await controller.create(...payload);
    expect(mockFileService.write).toHaveBeenCalledWith(file);
    expect(mockFramesService.create).toHaveBeenCalledWith({
      filename,
      index,
      length,
      Scene: { connect: { id: sceneid } },
    });
  });

  it('should call the FramesService.update method with Prisma.FrameCreateInput payload when the update method is called', async () => {
    const id = 0;

    const payload: Parameters<typeof controller.update> = [
      id,
      file as unknown as Express.Multer.File,
      length,
      index,
    ];

    await controller.update(...payload);
    expect(mockFileService.overwrite).toHaveBeenCalledWith(file);
    expect(mockFramesService.update).toHaveBeenCalledWith(id, {
      length,
      index,
    });
  });

  it('should call the FramesService.delete method with Prisma.FrameCreateInput payload when the remove method is called', async () => {
    const id = 123;

    await controller.remove(id);
    expect(mockFramesService.delete).toHaveBeenCalledWith(id);
  });
});
