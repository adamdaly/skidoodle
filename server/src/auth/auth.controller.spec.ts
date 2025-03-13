import { Test, TestingModule } from '@nestjs/testing';
import { register, RegisterPayload, signIn, SignInPayload } from 'src/api/auth';
import { AuthController } from './auth.controller';

jest.mock('src/api/auth');

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should make a call to the auth server when the register POST method is called', async () => {
    const payload: RegisterPayload = {
      username: 'user',
      password: 'password',
    };

    await controller.register(payload);

    expect(register).toHaveBeenCalledWith(payload);
  });

  it('should make a call to the auth server when the signIn POST method is called', async () => {
    const payload: SignInPayload = {
      username: 'user',
      password: 'password',
    };

    await controller.signIn(payload);

    expect(signIn).toHaveBeenCalledWith(payload);
  });
});
