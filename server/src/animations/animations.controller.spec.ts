import { JwtPayload } from 'jsonwebtoken';
import { Test, TestingModule } from '@nestjs/testing';
import { Animation, Scene } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScenesService } from 'src/scenes/scenes.service';
import { AnimationsController } from './animations.controller';
import { AnimationsService } from './animations.service';
import { CreateDto, UpdateDto } from './animations.dto';

describe('AnimationsController', () => {
  let controller: AnimationsController;
  let service: AnimationsService;
  let sceneService: ScenesService;

  const animation: Animation = {
    name: 'Animation',
    width: 1920,
    height: 1024,
    framerate: 24,
    userid: 'user-1234',
    id: 123,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };

  const mockAnimationService = {
    create: jest.fn(),
    getAnimationById: jest.fn(),
    getAnimationsByUserId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockSceneService = {
    getScenesByAnimationId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimationsController],
      providers: [
        PrismaService,
        {
          provide: AnimationsService,
          useValue: mockAnimationService,
        },
        {
          provide: ScenesService,
          useValue: mockSceneService,
        },
      ],
    }).compile();

    controller = module.get<AnimationsController>(AnimationsController);
    service = module.get<AnimationsService>(AnimationsService);
    sceneService = module.get<ScenesService>(ScenesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an animation when the create POST method is called', async () => {
    const user: JwtPayload = {
      sub: 'sub',
      exp: 1234,
      iat: 1234,
    };

    const payload: CreateDto = {
      name: 'Animation',
      width: 1920,
      height: 1024,
      framerate: 24,
    };

    const result: Animation = {
      ...payload,
      userid: user.userId as string,
      id: 123,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    };

    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.create(user, payload)).toEqual(result);
  });

  it('should read an animation based on its id', async () => {
    const result: Animation = {
      ...animation,
    };

    jest
      .spyOn(service, 'getAnimationById')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.getAnimationById(123)).toEqual(result);
  });

  it('should read all animation scenes based on animationid using the getScenesByAnimationId method', async () => {
    const result: Scene[] = [];

    jest
      .spyOn(sceneService, 'getScenesByAnimationId')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.getScenesByAnimationId(123)).toEqual(result);
  });

  it('should update an animation based on its id', async () => {
    const result: Animation = {
      ...animation,
    };

    const payload: UpdateDto = {
      name: 'Updated Animation',
      framerate: 24,
    };

    const spy = jest
      .spyOn(service, 'update')
      .mockImplementation(() => Promise.resolve(result));

    await controller.update(123, payload);

    expect(spy).toHaveBeenCalledWith(123, payload);
  });

  it('should delete an animation based on its id', async () => {
    const result: Animation = {
      ...animation,
      isDeleted: true,
    };

    const spy = jest
      .spyOn(service, 'delete')
      .mockImplementation(() => Promise.resolve(result));

    await controller.delete(123);

    expect(spy).toHaveBeenCalledWith(123);
  });
});
