import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { FramesService } from './frames.service';

describe('FramesService', () => {
  let service: FramesService;

  const mockPrismaService = {
    animation: {
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FramesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<FramesService>(FramesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
