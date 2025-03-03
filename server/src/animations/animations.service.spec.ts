import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnimationsService } from './animations.service';

describe('AnimationsService', () => {
  let service: AnimationsService;

  const animation: Prisma.AnimationUpdateInput = {
    name: 'Animation',
    width: 1920,
    height: 1024,
    framerate: 24,
    userid: 'user-1234',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };

  const mockPrismaService = {
    animation: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimationsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
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
    const payload: Prisma.AnimationCreateInput = {
      name: 'Animation',
      width: 1920,
      height: 1024,
      framerate: 24,
      userid: 'user-1234',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    };

    await service.create(payload);
    expect(mockPrismaService.animation.create).toHaveBeenCalledWith({
      data: payload,
    });
  });

  it('should call prisma.animation.findUnique with the correct data when the getAnimationById service function is called', async () => {
    const id = 1;
    await service.getAnimationById(id);

    expect(mockPrismaService.animation.findUnique).toHaveBeenCalledWith({
      where: { id },
      include: {
        Scene: true,
      },
    });
  });

  it('should call prisma.animation.update function with the correct data when the update service function is called', async () => {
    const id = 1;

    await service.update(id, animation);

    expect(mockPrismaService.animation.update).toHaveBeenCalledWith({
      where: { id },
      data: animation,
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
