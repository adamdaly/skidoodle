import { Test, TestingModule } from '@nestjs/testing';
import { AnimationsController } from './animations.controller';

describe('AnimationsController', () => {
  let controller: AnimationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimationsController],
    }).compile();

    controller = module.get<AnimationsController>(AnimationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
