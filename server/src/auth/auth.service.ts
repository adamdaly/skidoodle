import AuthServiceLocal from './auth.service.local';
import AuthServiceProd from './auth.service.prod';

const AuthService =
  process.env.NODE_ENV === 'development' ? AuthServiceLocal : AuthServiceProd;

export const authService = new AuthService();
