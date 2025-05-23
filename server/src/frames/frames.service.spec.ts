import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { FramesService } from './frames.service';
import { CreateDto, UpdateDto } from './frames.dto';

describe('FramesService', () => {
  let service: FramesService;

  const mockPrismaService = {
    frame: {
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const frameCreate: CreateDto = {
    length: 10,
    index: 0,
    filename: 'filename.png',
    sceneid: 1234,
  };

  const frameUpdate: UpdateDto = {
    length: 10,
    index: 0,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FramesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<FramesService>(FramesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call prisma.frame.create with the correct data when the create service function is called', async () => {
    await service.create(frameCreate);

    expect(mockPrismaService.frame.create).toHaveBeenCalledWith({
      data: {
        length: frameCreate.length,
        index: frameCreate.index,
        filename: frameCreate.filename,

        Scene: {
          connect: {
            id: frameCreate.sceneid,
          },
        },
      },
    });
  });

  it('should call prisma.frame.update with the correct data when the update service function is called', async () => {
    const id = 123;
    await service.update(id, frameUpdate);

    expect(mockPrismaService.frame.update).toHaveBeenCalledWith({
      where: { id },
      data: frameUpdate,
    });
  });

  it('should call prisma.frame.delete with the correct data when the delete service function is called', async () => {
    const id = 123;
    await service.delete(id);

    expect(mockPrismaService.frame.update).toHaveBeenCalledWith({
      where: { id },
      data: { isDeleted: true },
    });
  });
});
