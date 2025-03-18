import { Test, TestingModule } from '@nestjs/testing';
import { Animation } from '@prisma/client';
import { CacheService } from 'src/cache/cache.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnimationsService } from './animations.service';
import { CreateDto, UpdateDto } from './animations.dto';

describe('AnimationsService', () => {
  let service: AnimationsService;

  const id = 123;

  const animation: Animation = {
    id,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
    name: 'Animation',
    width: 1920,
    height: 1024,
    framerate: 24,
    userid: 'user-1234',
  };

  const animationCreate: CreateDto = {
    name: 'Animation',
    width: 1920,
    height: 1024,
    framerate: 24,
    userid: 'user-1234',
  };

  const animationUpdate: UpdateDto = {
    name: 'Animation',
    width: 1920,
    height: 1024,
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
    await service.create(animationCreate);
    expect(mockPrismaService.animation.create).toHaveBeenCalledWith({
      data: animationCreate,
    });
  });

  it('should call prisma.animation.findUnique with the correct data when the getAnimationById service function is called', async () => {
    const id = 1;
    await service.getAnimationById(id);

    expect(mockPrismaService.animation.findUnique).toHaveBeenCalledWith({
      where: { id },
      include: {
        Scene: {
          take: expect.any(Number) as number,
          orderBy: {
            updatedAt: expect.any(String) as string,
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
