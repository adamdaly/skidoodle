import { Test, TestingModule } from '@nestjs/testing';
import { Animation } from '@prisma/client';
import { CacheService } from 'src/cache/cache.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnimationsService } from './animations.service';
import { CreateDto, UpdateDto } from './animations.dto';
import { DMMF } from '@prisma/client/runtime/library';

describe('AnimationsService', () => {
  let service: AnimationsService;

  const id = 123;
  const userid = 'user-1234';

  const animation: Animation = {
    id,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
    name: 'Animation',
    width: 1920,
    height: 1024,
    framerate: 24,
    userid,
  };

  const animationCreate: CreateDto = {
    name: 'Animation',
    width: 1920,
    height: 1024,
    framerate: 24,
  };

  const animationUpdate: UpdateDto = {
    name: 'Animation',
    framerate: 24,
  };

  const mockPrismaService = {
    animation: {
      create: jest.fn(() => ({ ...animation })),
      findUnique: jest.fn(() => ({ ...animation })),
      update: jest.fn(() => ({ ...animation })),
    },
  };

  const mockCacheService = {
    reset: jest.fn(),
    cacheFromResponse: jest.fn((ket: string, callback: () => unknown) =>
      callback(),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimationsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    service = module.get<AnimationsService>(AnimationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call prisma.animation.create with the correct data', async () => {
    await service.create({ ...animationCreate, userid });
    expect(mockPrismaService.animation.create).toHaveBeenCalledWith({
      data: { ...animationCreate, userid },
      include: {
        Scene: true,
      },
    });
  });

  it('should call prisma.animation.findUnique with the correct data when the getAnimationById service function is called', async () => {
    const id = 1;

    await service.getAnimationById(id);

    expect(mockPrismaService.animation.findUnique).toHaveBeenCalledWith({
      where: { id },
      include: {
        Scene: {
          orderBy: {
            updatedAt: expect.any(String) as string,
          },
          select: {
            id: true,
            name: true,
            userid: true,
            createdAt: true,
            updatedAt: true,
            Frame: {
              orderBy: {
                updatedAt: expect.any(String) as string,
              },
            },
          },
        },
      },
    });
  });

  it('should call prisma.animation.findUnique with the correct data when the getAnimationById service function is called with pagination params', async () => {
    const id = 1;

    const sceneTake: number = 1;
    const sceneSkip: number = 1;
    const sceneSortOrder: DMMF.SortOrder = 'desc';
    const frameTake: number = 1;
    const frameSkip: number = 1;
    const frameSortOrder: DMMF.SortOrder = 'desc';

    await service.getAnimationById(
      id,
      sceneTake,
      sceneSkip,
      sceneSortOrder,
      frameTake,
      frameSkip,
      frameSortOrder,
    );

    expect(mockPrismaService.animation.findUnique).toHaveBeenCalledWith({
      where: { id },
      include: {
        Scene: {
          take: sceneTake,
          skip: sceneSkip,
          orderBy: {
            updatedAt: sceneSortOrder,
          },
          select: {
            id: true,
            name: true,
            userid: true,
            createdAt: true,
            updatedAt: true,
            Frame: {
              take: frameTake,
              skip: frameSkip,
              orderBy: {
                updatedAt: frameSortOrder,
              },
            },
          },
        },
      },
    });
  });

  it('should call prisma.animation.update function with the correct data when the update service function is called', async () => {
    const id = 1;

    await service.update(id, animationUpdate);

    expect(mockPrismaService.animation.update).toHaveBeenCalledWith({
      where: { id },
      data: animationUpdate,
    });
  });

  it('should call prisma.animation.update function with the correct data when the delete service function is called', async () => {
    const id = 1;

    await service.delete(id);

    expect(mockPrismaService.animation.update).toHaveBeenCalledWith({
      where: { id },
      data: { isDeleted: true, updatedAt: expect.any(Date) as Date },
    });
  });
});
