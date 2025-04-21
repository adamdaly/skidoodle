import { post } from '../../api';
import { verify } from '../auth.api';

jest.mock('../../api');

describe('Auth API', () => {
  describe('verify', () => {
    it("should call the post API function with the query 'refresh_token' when the verify function is called", async () => {
      const accessToken = 'asdf1234';

      await verify(accessToken);

      expect(post).toHaveBeenCalledWith(
        `http://auth-server:3000/token/verify`,
        {
          accessToken,
        },
        undefined,
      );
    });
  });
});
