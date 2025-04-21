import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from './app.module';
import { AuthMiddleware } from './auth/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('secret'));

  app.enableCors({
    origin: 'http://localhost:3004',
    credentials: true,
  });

  app.use(
    new AuthMiddleware(app.get(JwtService)).use.bind(
      new AuthMiddleware(app.get(JwtService)),
    ),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
