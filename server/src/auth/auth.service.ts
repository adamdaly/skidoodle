import AuthServiceLocal from './auth.service.local';
import AuthServiceProd from './auth.service.prod';

const AuthService = ['development', 'test'].includes(process.env.NODE_ENV ?? '')
  ? AuthServiceLocal
  : AuthServiceProd;

export const authService = new AuthService();
