import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('CacheService', () => {
  let service: CacheService;

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the cacheManager.get method and return a value when available when the get method is called', async () => {
    const value = 'value';
    mockCacheManager.get.mockImplementation(() => value);

    const key = 'key';
    const cached = await service.get(key);
    expect(mockCacheManager.get).toHaveBeenCalledWith(key);
    expect(cached).toBe(value);
  });

  it('should call the cacheManager.get method and return null when there is no cached value available when the get method is called', async () => {
    mockCacheManager.get.mockImplementation(() => undefined);

    const key = 'key';
    const cached = await service.get(key);

    expect(cached).toBeNull();
  });

  it('should call the cacheManager.set method when the set method is called', async () => {
    const value = 'value';

    const key = 'key';
    await service.set(key, value);
    expect(mockCacheManager.set).toHaveBeenCalledWith(key, value);
  });

  it('should call the cacheManager.del method when the reset method is called', async () => {
    const key = 'key';
    await service.reset(key);
    expect(mockCacheManager.del).toHaveBeenCalledWith(key);
  });

  it('should return a cached value if available when cacheFromResponse is called', async () => {
    const key = 'key';

    const value = 'value';
    mockCacheManager.get.mockImplementation(() => value);

    const response = await service.cacheFromResponse(key, () =>
      Promise.resolve(),
    );
    expect(mockCacheManager.get).toHaveBeenCalledWith(key);
    expect(response).toBe(value);
  });

  it('should return a value from the callback if no cahced value is available when cacheFromResponse is called', async () => {
    const key = 'key';

    const value = 'value';
    mockCacheManager.get.mockImplementation(() => undefined);

    const response = await service.cacheFromResponse(key, () =>
      Promise.resolve(value),
    );
    expect(mockCacheManager.get).toHaveBeenCalledWith(key);
    expect(mockCacheManager.set).toHaveBeenCalledWith(key, value);
    expect(response).toBe(value);
  });
});
