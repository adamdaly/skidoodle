import { Test, TestingModule } from '@nestjs/testing';
import { CollabServiceProd } from './collab.service.prod';

describe('CollabService', () => {
  let service: CollabServiceProd;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollabServiceProd],
    }).compile();

    service = module.get<CollabServiceProd>(CollabServiceProd);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
