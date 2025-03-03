import { Test, TestingModule } from '@nestjs/testing';
import { AnimationsController } from './animations.controller';
import { AnimationsService } from './animations.service';
import { Animation, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AnimationsController', () => {
  let controller: AnimationsController;
  let service: AnimationsService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimationsController],
      providers: [PrismaService, AnimationsService],
    }).compile();

    controller = module.get<AnimationsController>(AnimationsController);
    service = module.get<AnimationsService>(AnimationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an animation when the create POST method is called', async () => {
    const payload: Prisma.AnimationCreateInput = {
      name: 'Animation',
      width: 1920,
      height: 1024,
      framerate: 24,
      userid: 'user-1234',
    };

    const result: Animation = {
      ...payload,
      id: 123,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    };

    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.create(payload)).toEqual(result);
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

  it('should update an animation based on its id', async () => {
    const result: Animation = {
      ...animation,
    };

    const payload: Prisma.AnimationUpdateInput = {
      name: 'Updated Animation',
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
