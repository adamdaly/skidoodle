import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Animation, Scene } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;

  const id = 123;

  const animation: Animation = {
    id,
    createdAt: new Date(2025, 0, 1, 1),
    updatedAt: new Date(2025, 0, 1, 1),
    isDeleted: false,
    name: 'Animation',
    width: 1920,
    height: 1024,
    framerate: 24,
    userid: 'user-1234',
  };

  const scene: Scene = {
    id: 123,
    name: 'Scene 01',
    index: 0,
    userid: 'asdf-1234',
    animationid: 1234,
    createdAt: new Date(2025, 0, 1, 2),
    updatedAt: new Date(2025, 0, 1, 2),
    isDeleted: false,
  };

  const mockPrismaService = {
    animation: {
      findMany: jest.fn(() => [{ ...animation }]),
    },
    scene: {
      findMany: jest.fn(() => [{ ...scene }]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of animations and scenes when the getRecents function is called', async () => {
    expect(await service.getRecents('')).toEqual([
      { ...scene, metadata: { type: 'Scene' } },
      { ...animation, metadata: { type: 'Animation' } },
    ]);
  });

  it('should return an array of animations when the getAnimationsByUserId function is called', async () => {
    expect(await service.getAnimationsByUserId('')).toEqual([animation]);
  });
});
