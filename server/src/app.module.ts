import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { AnimationsModule } from './animations/animations.module';
import { AppController } from './app.controller';
import { FileService } from './file/file.service';
import { FramesModule } from './frames/frames.module';
import { ScenesModule } from './scenes/scenes.module';
import { PrismaService } from './prisma/prisma.service';
import { CacheService } from './cache/cache.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot(),
    CognitoAuthModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        jwtVerifier: {
          userPoolId: configService.get('COGNITO_USER_POOL_ID') ?? '',
          clientId: configService.get('COGNITO_CLIENT_ID') ?? '',
          tokenUse: 'access',
        },
      }),
    }),
    AnimationsModule,
    ScenesModule,
    FramesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, FileService, CacheService, JwtService],
})
export class AppModule {}
