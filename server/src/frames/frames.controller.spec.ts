import { Test, TestingModule } from '@nestjs/testing';
import { FramesController } from './frames.controller';
import { FramesService } from './frames.service';

describe('FramesController', () => {
  let controller: FramesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FramesController],
      providers: [FramesService],
    }).compile();

    controller = module.get<FramesController>(FramesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
