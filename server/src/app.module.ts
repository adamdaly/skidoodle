import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AnimationsModule } from './animations/animations.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { FileService } from './file/file.service';
import { FramesModule } from './frames/frames.module';
import { ScenesModule } from './scenes/scenes.module';
import { PrismaService } from './prisma/prisma.service';
import { CacheService } from './cache/cache.service';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot(),
    AnimationsModule,
    ScenesModule,
    FramesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, FileService, CacheService],
})
export class AppModule {}
