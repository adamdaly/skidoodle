import { get, post } from '../../api';
import {
  register,
  signIn,
  verify,
  refresh,
  RegisterPayload,
  SignInPayload,
} from '../auth-api';
jest.mock('../../api');

describe('Auth API', () => {
  describe('register', () => {
    it('should call the post API function with payload: RegisterPayload when the register function is called', async () => {
      const payload: RegisterPayload = { username: '', password: '' };

      await register(payload);

      expect(post).toHaveBeenCalledWith(
        'http://auth-server:3000/register',
        payload,
      );
    });
  });

  describe('signIn', () => {
    it('should call the post API function with payload: SignInPayload when the signIn function is called', async () => {
      const payload: SignInPayload = { username: '', password: '' };

      await register(payload);

      expect(post).toHaveBeenCalledWith(
        'http://auth-server:3000/register',
        payload,
      );
    });
  });

  describe('verify', () => {
    it("should call the get API function with the query 'refresh_token' when the verify function is called", async () => {
      const accessToken = 'asdf1234';

      await verify(accessToken);

      expect(get).toHaveBeenCalledWith(
        `http://auth-server:3000/token/verify?access_token=${accessToken}`,
      );
    });
  });

  describe('refresh', () => {
    it('should call the get API function when the refresh function is called', async () => {
      await refresh();

      expect(get).toHaveBeenCalledWith(`http://auth-server:3000/token/refresh`);
    });
  });
});
