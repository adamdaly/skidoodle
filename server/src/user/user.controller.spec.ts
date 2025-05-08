import {
  COGNITO_JWT_VERIFIER_INSTANCE_TOKEN,
  CognitoJwtPayload,
} from '@nestjs-cognito/core';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const user: CognitoJwtPayload = {
    username: 'asdf-1234',
    token_use: 'access',
    sub: 'sub',
    iss: 'iss',
    exp: 1234,
    iat: 1234,
    auth_time: 1234,
    jti: 'jti',
    origin_jti: 'origin_jti',
  };

  const mockUserService = {
    getRecents: jest.fn(() => Promise.resolve()),
    getAnimationsByUserId: jest.fn(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: COGNITO_JWT_VERIFIER_INSTANCE_TOKEN,
          useValue: {},
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the UserService.getRecents function with the userid when the getRecents function is called', async () => {
    await controller.getRecents(user);
    expect(mockUserService.getRecents).toHaveBeenCalled();
  });

  it('should call the UserService.getAnimationsByUserId function with the userid when the getAnimationsByUserId function is called', async () => {
    await controller.getAnimationsByUserId(user);
    expect(mockUserService.getAnimationsByUserId).toHaveBeenCalled();
  });
});
