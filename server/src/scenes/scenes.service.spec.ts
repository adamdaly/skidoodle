import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScenesService } from './scenes.service';

describe('ScenesService', () => {
  let service: ScenesService;

  const mockPrismaService = {
    animation: {
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScenesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ScenesService>(ScenesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
