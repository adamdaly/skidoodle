import { Test, TestingModule } from '@nestjs/testing';
import { CollabResolver } from './collab.resolver';
import { CollabServiceProd } from './collab.service.prod';

describe('CollabResolver', () => {
  let resolver: CollabResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollabResolver, CollabServiceProd],
    }).compile();

    resolver = module.get<CollabResolver>(CollabResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
