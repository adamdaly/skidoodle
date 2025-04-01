import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from './auth/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('secret'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3004',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Skidoodle')
    .setDescription('The Skidoodle API')
    .setVersion('1.0')
    .build();

  app.use(
    new AuthMiddleware(app.get(JwtService)).use.bind(
      new AuthMiddleware(app.get(JwtService)),
    ),
  );

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
