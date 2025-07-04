import { PubSub } from 'graphql-subscriptions';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CollabSession,
  CollabSessionSchema,
  CollabInvite,
  CollabInviteSchema,
} from 'src/collab/schemas/collab.schema';
import { CollabServiceProd } from './collab.service.prod';
import { CollabServiceLocal } from './collab.service.local';
import { CollabResolver } from './collab.resolver';
import { CollabController } from './collab.controller';

@Module({
  providers: [
    CollabResolver,
    {
      provide: 'CollabService',
      useClass: ['development', 'test'].includes(process.env.NODE_ENV ?? '')
        ? CollabServiceLocal
        : CollabServiceProd,
    },
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  controllers: [CollabController],
  imports: [
    MongooseModule.forFeature([
      { name: CollabSession.name, schema: CollabSessionSchema },
      { name: CollabInvite.name, schema: CollabInviteSchema },
    ]),
  ],
})
export class CollabModule {}
