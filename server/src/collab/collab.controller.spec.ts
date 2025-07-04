import { Test, TestingModule } from '@nestjs/testing';
import { CollabController } from './collab.controller';

describe('CollabController', () => {
  let controller: CollabController;

  const mockCollabService = {
    confirm: jest.fn(),
  };

  const mockPubSub = {
    confirm: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollabController],
      providers: [
        {
          provide: 'CollabService',
          useValue: mockCollabService,
        },
        {
          provide: 'PUB_SUB',
          useValue: mockPubSub,
        },
      ],
    }).compile();

    controller = module.get<CollabController>(CollabController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
