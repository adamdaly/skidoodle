import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const userid = 'asdf-1234';

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
        PrismaService,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the UserService.getRecents function with the userid when the getRecents function is called', async () => {
    await controller.getRecents({ username: '', userId: userid });
    expect(mockUserService.getRecents).toHaveBeenCalled();
  });

  it('should call the UserService.getAnimationsByUserId function with the userid when the getAnimationsByUserId function is called', async () => {
    await controller.getAnimationsByUserId({ username: '', userId: userid });
    expect(mockUserService.getAnimationsByUserId).toHaveBeenCalled();
  });
});
