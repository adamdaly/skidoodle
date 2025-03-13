import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScenesController } from './scenes.controller';
import { ScenesService } from './scenes.service';

describe('ScenesController', () => {
  let controller: ScenesController;

  const mockScenesService = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScenesController],
      providers: [
        {
          provide: ScenesService,
          useValue: mockScenesService,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<ScenesController>(ScenesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the ScenesService.create method with Prisma.SceneCreateInput payload when the create method is called', async () => {
    // @ts-expect-error - Testing
    const payload: Prisma.SceneCreateInput = {
      name: 'Scene 01',
      index: 0,
      userid: 'asdf-1234',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    };

    await controller.create(payload);
    expect(mockScenesService.create).toHaveBeenCalledWith(payload);
  });

  it('should call the ScenesService.update method with Prisma.SceneCreateInput payload when the update method is called', async () => {
    const id = 123;

    const payload: Prisma.SceneUpdateInput = {
      name: 'Scene 01',
      index: 0,
      userid: 'asdf-1234',
    };

    await controller.update(id, payload);
    expect(mockScenesService.update).toHaveBeenCalledWith(id, payload);
  });

  it('should call the ScenesService.update method with Prisma.SceneCreateInput payload when the update  method is called', async () => {
    const id = 123;

    await controller.delete(id);
    expect(mockScenesService.delete).toHaveBeenCalledWith(id);
  });
});
