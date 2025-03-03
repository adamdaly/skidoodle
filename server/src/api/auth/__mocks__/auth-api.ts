import { RegisterResponse, SignInResponse } from '../auth-api';

export const register = jest.fn(
  (): Promise<{ data: RegisterResponse }> =>
    Promise.resolve({
      data: {
        id: 'asdf-1234',
        username: 'Some Name',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        isDeleted: false,
      },
    }),
);

export const signIn = jest.fn(
  (): Promise<{ data: SignInResponse }> =>
    Promise.resolve({
      data: {
        accessToken: 'asdf-1234',
      },
    }),
);

export const verify = jest.fn(() => Promise.resolve());

export const refresh = jest.fn(() => Promise.resolve());
