import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScenesService } from './scenes.service';

describe('ScenesService', () => {
  let service: ScenesService;

  const mockPrismaService = {
    scene: {
      create: jest.fn(),
      update: jest.fn(),
    },
  };
  // @ts-expect-error - Testing
  const scene: Prisma.SceneCreateInput = {
    name: 'Scene 01',
    index: 0,
    userid: 'asdf-1234',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScenesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ScenesService>(ScenesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call prisma.scene.create with the correct data when the create service function is called', async () => {
    await service.create(scene);

    expect(mockPrismaService.scene.create).toHaveBeenCalledWith({
      data: scene,
    });
  });

  it('should call prisma.frame.update with the correct data when the update service function is called', async () => {
    const id = 123;
    await service.update(id, scene);

    expect(mockPrismaService.scene.update).toHaveBeenCalledWith({
      where: { id },
      data: scene,
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
