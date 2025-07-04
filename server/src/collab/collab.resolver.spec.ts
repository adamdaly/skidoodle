import { Test, TestingModule } from '@nestjs/testing';
import { CollabResolver } from './collab.resolver';
import { CollabServiceProd } from './collab.service.prod';
import { PubSub } from 'graphql-subscriptions';

describe('CollabResolver', () => {
  let resolver: CollabResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollabResolver,
        {
          provide: 'CollabService',
          useClass: CollabServiceProd,
        },
        {
          provide: 'PUB_SUB',
          useValue: new PubSub(),
        },
      ],
    }).compile();

    resolver = module.get<CollabResolver>(CollabResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
