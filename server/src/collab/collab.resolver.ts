import { PubSub } from 'graphql-subscriptions';
import {
  Resolver,
  Query,
  Mutation,
  Subscription,
  Args,
  Int,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {
  CollabSession,
  CollabFrame,
  CollabPaint,
  CollabInvite,
} from './entities/collab.entity';
import { CollabService } from './collab.types';

@Resolver()
export class CollabResolver {
  constructor(
    @Inject('CollabService')
    private readonly collabService: CollabService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  getFrameSelectionTrigger(sessionid: string) {
    return `${sessionid}-frames`;
  }

  getPaintTrigger(sessionid: string) {
    return `${sessionid}-paint`;
  }

  @Query(() => CollabSession)
  async getRootSession(@Args('sessionid') sessionid: string) {
    return this.collabService.getRootSession(sessionid);
  }

  @Query(() => [CollabSession])
  async getSessions(@Args('sessionid') sessionid: string) {
    return this.collabService.getSessions(sessionid);
  }

  @Query(() => [CollabFrame])
  async getFrameSelection(@Args('sessionid') sessionid: string) {
    return await this.collabService.getFrameSelection(sessionid);
  }

  @Mutation(() => CollabSession)
  async createParentSession(
    @Args('sceneid', { type: () => Int }) sceneid: number,
    @Args('frameid', { type: () => Int }) frameid: number,
    @Args('email') email: string,
  ) {
    console.log(
      Object.getOwnPropertyNames(Object.getPrototypeOf(this.collabService)),
    );
    const session = await this.collabService.createParentSession(
      sceneid,
      frameid,
      email,
    );
    return session;
  }

  @Mutation(() => CollabInvite)
  async createInvite(
    @Args('parentSessionId') parentSessionId: string,
    @Args('email') email: string,
  ) {
    const response = await this.collabService.invite(parentSessionId, email);
    return response;
  }

  @Mutation(() => CollabSession)
  async updateSession(
    @Args('parentSessionId') parentSessionId: string,
    @Args('childSessionId') childSessionId: string,
    @Args('frameid', { type: () => Int }) frameid: number,
  ) {
    const response = await this.collabService.updateSession(
      parentSessionId,
      childSessionId,
      frameid,
    );

    if (!response) {
      throw new Error('Failed to update session');
    }

    try {
      await this.pubSub.publish(
        this.getFrameSelectionTrigger(parentSessionId),
        await this.collabService.getFrameSelection(parentSessionId),
      );
    } catch (e) {
      console.log(e);
    }

    return response;
  }

  @Subscription(() => [CollabSession])
  sessions(@Args('sessionid') sessionid: string) {
    return this.pubSub.asyncIterableIterator(sessionid);
  }

  @Subscription(() => [CollabFrame], {
    resolve: (payload: CollabFrame[]) => {
      return payload;
    },
  })
  frameSelection(@Args('sessionid') sessionid: string) {
    return this.pubSub.asyncIterableIterator(
      this.getFrameSelectionTrigger(sessionid),
    );
  }

  @Mutation(() => CollabPaint)
  async mutationPaint(
    @Args('sessionid') sessionid: string,
    @Args('frameid', { type: () => Int }) frameid: number,
    @Args('data') data: string,
  ) {
    try {
      await this.pubSub.publish(this.getPaintTrigger(sessionid), {
        sessionid,
        frameid,
        data,
      });
    } catch (e) {
      console.log(e);
    }

    return {
      sessionid,
      frameid,
      data,
    };
  }

  @Subscription(() => CollabPaint, {
    resolve: (payload: CollabPaint) => {
      return payload;
    },
  })
  subscriptionPaint(@Args('sessionid') sessionid: string) {
    return this.pubSub.asyncIterableIterator(this.getPaintTrigger(sessionid));
  }
}
