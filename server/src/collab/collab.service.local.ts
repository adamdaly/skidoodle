import Color from 'color';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollabInvite, CollabSession } from './schemas/collab.schema';

import {
  CollabInviteType,
  CollabService,
  CollabSessionType,
} from './collab.types';

@Injectable()
export class CollabServiceLocal implements CollabService {
  constructor(
    @InjectModel(CollabSession.name)
    private readonly collabSessionModel: Model<CollabSession>,
    @InjectModel(CollabInvite.name)
    private readonly collabInviteModel: Model<CollabInvite>,
  ) {}

  async createParentSession(sceneid: number, frameid: number, email: string) {
    const session = new this.collabSessionModel({
      sceneid,
      email,
      pin: Math.floor(Math.random() * 900_000 + 100_000).toString(),
      expires: new Date().getTime() + 60 * 60 * 1000,
      color: Color.hsl(Math.round(Math.random() * 360), 80, 90).toString(),
      frames: [],
    });

    session.$set({
      parentSessionId: session._id.toString(),
      frames: [
        {
          sessionid: session._id.toString(),
          frameid,
        },
      ],
    });

    await session.save();

    const sessionAsObject = session.toObject();

    return {
      sceneid: sessionAsObject.sceneid,
      parentSessionId: sessionAsObject.parentSessionId,
      sessionid: sessionAsObject._id.toString(),
      email: sessionAsObject.email,
      color: sessionAsObject.color,
      expires: sessionAsObject.expires,
      frames: sessionAsObject.frames,
    } satisfies CollabSessionType;
  }

  async invite(parentSessionId: string, email: string) {
    const invite = new this.collabInviteModel({
      parentSessionId,
      email,
      pin: Math.floor(Math.random() * 900_000 + 100_000).toString(),
      expires: new Date().getTime() + 60 * 60 * 1000,
    });

    await invite.save();

    const inviteAsObject = invite.toObject();

    return {
      id: inviteAsObject._id.toString(),
      parentSessionId: inviteAsObject.parentSessionId,
      email: inviteAsObject.email,
      pin: inviteAsObject.pin,
      expires: inviteAsObject.expires,
    } satisfies CollabInviteType;
  }

  async confirm(inviteid: string, pin: string) {
    const invite = await this.collabInviteModel.findById(inviteid);

    if (!invite) {
      throw new Error('No Invite Found');
    }

    if (!(invite.pin === pin && new Date().getTime() < invite.expires)) {
      throw new Error('Pin not valid or session expired');
    }
    if (
      !(
        invite.get('pin') === pin &&
        new Date().getTime() < invite.get('expires')
      )
    ) {
      throw new Error('Pin not valid or session expired');
    }

    const parentSession = await this.collabSessionModel.findById(
      invite.get('parentSessionId'),
    );

    if (!parentSession) {
      throw new Error('No parent session found');
    }

    const session = new this.collabSessionModel({
      parentSessionId: parentSession._id.toString(),
      sceneid: parentSession.get('sceneid'),
      email: invite.get('email'),
      expires: new Date().getTime() + 60 * 60 * 1000,
      color: Color.hsl(Math.round(Math.random() * 360), 80, 80).toString(),
    });

    await session.save();

    const sessionAsObject = session.toObject();

    return {
      sceneid: sessionAsObject.sceneid,
      parentSessionId: sessionAsObject.parentSessionId,
      sessionid: sessionAsObject._id.toString(),
      email: sessionAsObject.email,
      color: sessionAsObject.color,
      expires: sessionAsObject.expires,
      frames: sessionAsObject.frames,
    } satisfies CollabSessionType;
  }

  async getRootSession(sessionid: string) {
    const session = await this.collabSessionModel.findById(sessionid);

    if (!session) {
      return undefined;
    }

    const sessionAsObject = session?.toObject();

    return {
      sceneid: sessionAsObject.sceneid,
      parentSessionId: sessionAsObject.parentSessionId,
      sessionid: sessionAsObject._id.toString(),
      email: sessionAsObject.email,
      color: sessionAsObject.color,
      expires: sessionAsObject.expires,
      frames: sessionAsObject.frames,
    } satisfies CollabSessionType;
  }

  async getSessions(sessionid: string) {
    const sessions = await this.collabSessionModel.find({
      $or: [{ _id: sessionid }, { parentSessionId: sessionid }],
    });

    return sessions.map((session) => {
      const sessionAsObject = session?.toObject();

      return {
        sceneid: sessionAsObject.sceneid,
        parentSessionId: sessionAsObject.parentSessionId,
        sessionid: sessionAsObject._id.toString(),
        email: sessionAsObject.email,
        color: sessionAsObject.color,
        expires: sessionAsObject.expires,
        frames: sessionAsObject.frames,
      } satisfies CollabSessionType;
    });
  }

  async getFrameSelection(sessionid: string) {
    const session = await this.getRootSession(sessionid);
    return session?.frames ?? [];
  }

  async updateSession(
    parentSessionId: string,
    childSessionId: string,
    frameid: number,
  ) {
    const currentSession =
      await this.collabSessionModel.findById(parentSessionId);

    if (!currentSession) {
      throw new Error(`Unable to find session with id: ${parentSessionId}`);
    }

    const currentFrames = currentSession?.frames ?? [];

    const index = currentFrames.findIndex(
      (frame) => frame.sessionid === childSessionId,
    );

    if (index > -1) {
      currentFrames[index].frameid = frameid;
    } else {
      currentFrames.push({ sessionid: childSessionId, frameid });
    }

    await this.collabSessionModel
      .findByIdAndUpdate(
        parentSessionId,
        {
          $set: { frames: currentFrames },
        },
        {
          new: true,
        },
      )
      .exec();

    const sessionAsObject = currentSession.toObject();

    return {
      sceneid: sessionAsObject.sceneid,
      parentSessionId: sessionAsObject.parentSessionId,
      sessionid: sessionAsObject._id.toString(),
      email: sessionAsObject.email,
      color: sessionAsObject.color,
      expires: sessionAsObject.expires,
      frames: currentFrames,
    } satisfies CollabSessionType;
  }
}
