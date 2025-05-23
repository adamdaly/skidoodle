import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AnimationsModule } from './animations/animations.module';
import { AppController } from './app.controller';
import { FramesModule } from './frames/frames.module';
import { ScenesModule } from './scenes/scenes.module';
import { PrismaService } from './prisma/prisma.service';
import { CacheService } from './cache/cache.service';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot(),
    AnimationsModule,
    ScenesModule,
    FramesModule,
    UserModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, CacheService, JwtService],
})
export class AppModule {}
