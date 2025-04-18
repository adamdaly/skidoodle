import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from 'src/cache/cache.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScenesService } from './scenes.service';
import { CreateDto, UpdateDto } from './scenes.dto';
import { Scene } from '@prisma/client';

describe('ScenesService', () => {
  let service: ScenesService;

  const user = {
    username: 'Some User',
    userId: 'asdf-1234',
  };

  const scene: Scene = {
    id: 1234,
    name: 'Scene 01',
    index: 0,
    userid: 'asdf-1234',
    animationid: 1234,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };

  const mockPrismaService = {
    scene: {
      create: jest.fn(),
      update: jest.fn(() => ({ ...scene })),
      findMany: jest.fn(),
    },
  };

  const sceneCreate: CreateDto = {
    name: 'Scene 01',
    index: 0,
    animationid: 1234,
  };

  const sceneUpdate: UpdateDto = {
    name: 'Scene 01',
    index: 0,
  };

  const mockCacheService = {
    reset: jest.fn(),
    cacheFromResponse: jest.fn((key: string, callback: () => unknown) =>
      callback(),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScenesService,
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

    service = module.get<ScenesService>(ScenesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call prisma.scene.create with the correct data when the create service function is called', async () => {
    await service.create({ ...sceneCreate, userid: user.userId });

    expect(mockPrismaService.scene.create).toHaveBeenCalledWith({
      data: {
        name: sceneCreate.name,
        index: sceneCreate.index,
        userid: user.userId,
        Animation: {
          connect: {
            id: sceneCreate.animationid,
          },
        },
      },
      include: {
        Frame: true,
      },
    });
  });

  it('should call prisma.scene.findMany with an animationid and params to handle pagination', async () => {
    const id = 1234;
    const orderBy = 'updatedAt';
    const skip = 0;
    const take = 10;
    const sortOrder = 'desc';

    await service.getScenesByAnimationId(id, orderBy, skip, take, sortOrder);

    expect(mockPrismaService.scene.findMany).toHaveBeenCalledWith({
      where: { animationid: id },
      skip,
      take,
      orderBy: {
        [orderBy]: sortOrder,
      },
      include: {
        Frame: {
          take: 1,
          where: {
            isDeleted: false,
          },
          select: {
            filename: true,
          },
        },
      },
    });
  });

  it('should call prisma.frame.update with the correct data when the update service function is called', async () => {
    const id = 123;
    await service.update(id, sceneUpdate);

    expect(mockPrismaService.scene.update).toHaveBeenCalledWith({
      where: { id },
      data: sceneUpdate,
    });
  });

  it('should call prisma.scene.delete with the correct data when the delete service function is called', async () => {
    const id = 123;
    await service.delete(id);

    expect(mockPrismaService.scene.update).toHaveBeenCalledWith({
      where: { id },
      data: { isDeleted: true },
    });
  });
});
