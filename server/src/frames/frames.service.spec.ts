import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FramesService } from './frames.service';

describe('FramesService', () => {
  let service: FramesService;

  const mockPrismaService = {
    frame: {
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  // @ts-expect-error - Testing
  const frame: Prisma.FrameCreateInput = {
    length: 10,
    index: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
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
    await service.create(frame);

    expect(mockPrismaService.frame.create).toHaveBeenCalledWith({
      data: frame,
    });
  });

  it('should call prisma.frame.update with the correct data when the update service function is called', async () => {
    const id = 123;
    await service.update(id, frame);

    expect(mockPrismaService.frame.update).toHaveBeenCalledWith({
      where: { id },
      data: frame,
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
