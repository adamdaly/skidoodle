import { Injectable } from '@nestjs/common';
import { Animation } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getRecents(userid: string) {
    const [animations, scenes] = await Promise.all([
      this.prisma.animation.findMany({
        where: { userid, isDeleted: false },
        include: {
          Scene: {
            take: 1,
            include: {
              Frame: {
                take: 1,
                select: {
                  filename: true,
                },
              },
            },
          },
        },
        take: 10,
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      this.prisma.scene.findMany({
        where: { userid, isDeleted: false },
        include: {
          Frame: {
            take: 1,
            select: {
              filename: true,
            },
          },
        },
        take: 10,
        orderBy: {
          updatedAt: 'desc',
        },
      }),
    ]);

    const animationsWithMetadata = animations.map((animation) => ({
      ...animation,
      metadata: {
        type: 'Animation',
      },
    }));

    const scenesWithMetadata = scenes.map((scene) => ({
      ...scene,
      metadata: {
        type: 'Scene',
      },
    }));

    return [...animationsWithMetadata, ...scenesWithMetadata]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .slice(0, 10);
  }

  getAnimationsByUserId(userid: string): Promise<Animation[] | null> {
    return this.prisma.animation.findMany({
      where: { userid, isDeleted: false },
      include: {
        Scene: {
          take: 1,
          include: {
            Frame: {
              select: {
                filename: true,
              },
            },
          },
          orderBy: {
            updatedAt: 'asc',
          },
        },
      },
    });
  }
}
