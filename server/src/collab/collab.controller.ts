import { Response } from 'express';
import { PubSub } from 'graphql-subscriptions';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ConfirmDto } from './collab.dto';
import { CollabService } from './collab.types';

@Controller('collab')
export class CollabController {
  constructor(
    @Inject('CollabService')
    private readonly collabService: CollabService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Post('confirm')
  async confirm(@Res() res: Response, @Body() body: ConfirmDto) {
    try {
      const invite = await this.collabService.confirm(body.inviteid, body.pin);

      try {
        if (invite.parentSessionId) {
          await this.pubSub.publish(invite.parentSessionId, {
            sessions: await this.collabService.getSessions(
              invite.parentSessionId,
            ),
          });
        }
      } catch (e) {
        console.log(e);
      }

      return res.status(200).json(invite);
    } catch (e) {
      console.log(e);
      return res.status(500).send('Error');
    }
  }
}
