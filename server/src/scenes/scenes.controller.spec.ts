import { JwtPayload } from 'jsonwebtoken';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScenesController } from './scenes.controller';
import { CreateDto, UpdateDto } from './scenes.dto';
import { ScenesService } from './scenes.service';

jest.mock('src/auth/auth.guard', () => ({
  AuthGuard: class AuthGuard {
    async canActivate() {
      return Promise.resolve(true);
    }
  },
}));

jest.mock('src/auth/auth.decorator', () => ({
  User: () => () => ({
    sub: '1234',
  }),
}));

describe('ScenesController', () => {
  let controller: ScenesController;

  const user: JwtPayload = {
    sub: 'sub',
    exp: 1234,
    iat: 1234,
  };

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
    const payload: CreateDto = {
      name: 'Scene 01',
      index: 0,
      animationid: 1234,
    };

    await controller.create(user, payload);
    expect(mockScenesService.create).toHaveBeenCalledWith({
      ...payload,
      userid: user.sub,
    });
  });

  it('should call the ScenesService.update method with Prisma.SceneCreateInput payload when the update method is called', async () => {
    const id = 123;

    const payload: UpdateDto = {
      name: 'Scene 01',
      index: 0,
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
