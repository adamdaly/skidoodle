import { Test, TestingModule } from '@nestjs/testing';
import { AnimationsService } from './animations.service';

describe('AnimationsService', () => {
  let service: AnimationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimationsService],
    }).compile();

    service = module.get<AnimationsService>(AnimationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
