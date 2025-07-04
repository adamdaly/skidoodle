import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  GetItemCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import Color from 'color';
import { Injectable } from '@nestjs/common';

import {
  CollabInviteType,
  CollabService,
  CollabSessionType,
} from './collab.types';

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

const sessionsTableName = process.env.AWS_COLLAB_INVITES;
const invitesTableName = process.env.AWS_COLLAB_SESSIONS;

@Injectable()
export class CollabServiceProd implements CollabService {
  constructor() {}

  async createParentSession(sceneid: number, frameid: number, email: string) {
    const sessionid = crypto.randomUUID();

    const session: CollabSessionType = {
      parentSessionId: sessionid,
      sessionid,
      sceneid,
      email: email,
      color: Color.hsl(Math.round(Math.random() * 360), 80, 90).toString(),
      expires: new Date().getTime() + 60 * 60 * 1000,
      frames: [
        {
          sessionid,
          frameid,
        },
      ],
    };

    const dynamoDbSession = new PutItemCommand({
      TableName: sessionsTableName,
      Item: {
        parentSessionId: { S: session.parentSessionId },
        sessionid: { S: session.sessionid },
        sceneid: { N: session.sceneid.toString() },
        email: { S: session.email },
        color: {
          S: session.color,
        },
        frames: {
          L: [
            {
              M: {
                sessionid: { S: sessionid },
                frameid: { N: frameid.toString() },
              },
            },
          ],
        },
      },
    });

    await client.send(dynamoDbSession);

    return session;
  }

  async invite(parentSessionId: string, email: string) {
    const invite: CollabInviteType = {
      id: crypto.randomUUID(),
      parentSessionId,
      email,
      pin: Math.floor(Math.random() * 900_000 + 100_000).toString(),
      expires: new Date().getTime() + 60 * 60 * 1000,
    };

    const inviteCommand = new PutItemCommand({
      TableName: invitesTableName,
      Item: {
        id: { S: invite.id },
        parentSessionId: { S: invite.parentSessionId },
        email: { S: invite.email },
        pin: { S: invite.pin },
        expires: { N: invite.expires.toString() },
      },
    });

    await client.send(inviteCommand);

    return invite;
  }

  async confirm(inviteid: string, pin: string) {
    const getInviteCommand = new GetItemCommand({
      TableName: invitesTableName,
      Key: {
        id: { S: inviteid },
      },
    });

    const getInviteResponse = await client.send(getInviteCommand);

    const invite = getInviteResponse.Item
      ? (unmarshall(getInviteResponse.Item) as CollabInviteType)
      : undefined;

    if (!invite) {
      throw new Error('No Invite Found');
    }

    if (!(invite.pin === pin && new Date().getTime() < invite.expires)) {
      throw new Error('Pin not valid or session expired');
    }

    const parentSessionId = invite.parentSessionId;

    const parentSessionCommand = new GetItemCommand({
      TableName: sessionsTableName,
      Key: {
        parentSessionId: { S: parentSessionId },
        sessionid: { S: parentSessionId },
      },
    });
    const parentSessionResponse = await client.send(parentSessionCommand);
    const parentSession = parentSessionResponse.Item
      ? (unmarshall(parentSessionResponse.Item) as CollabSessionType)
      : undefined;

    if (!parentSession) {
      throw new Error('No parent session found');
    }

    const session: CollabSessionType = {
      parentSessionId: parentSession.parentSessionId,
      sessionid: crypto.randomUUID(),
      sceneid: parentSession.sceneid,
      email: invite.email,
      expires: new Date().getTime() + 60 * 60 * 1000,
      color: Color.hsl(Math.round(Math.random() * 360), 80, 80).toString(),
      frames: null,
    };

    const inviteCommand = new PutItemCommand({
      TableName: sessionsTableName,
      Item: {
        parentSessionId: { S: session.parentSessionId },
        sessionid: { S: session.sessionid },
        sceneid: { S: session.sceneid.toString() },
        email: { S: session.email },
        expires: { N: session.expires.toString() },
        color: { S: session.color },
      },
    });

    await client.send(inviteCommand);

    return session;
  }

  async getRootSession(sessionid: string) {
    const command = new GetItemCommand({
      TableName: sessionsTableName,
      Key: {
        parentSessionId: { S: sessionid },
        sessionid: { S: sessionid },
      },
    });

    const response = await client.send(command);

    return response.Item
      ? (unmarshall(response.Item) as CollabSessionType)
      : undefined;
  }

  async getSessions(sessionid: string) {
    const command = new QueryCommand({
      TableName: sessionsTableName,
      KeyConditionExpression: 'parentSessionId = :parentSessionId',
      ExpressionAttributeValues: {
        ':parentSessionId': { S: sessionid },
      },
    });

    const response = await client.send(command);

    return response.Items?.map((item) => unmarshall(item) as CollabSessionType);
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
    const getCommand = new GetItemCommand({
      TableName: sessionsTableName,
      Key: {
        parentSessionId: { S: parentSessionId },
        sessionid: { S: parentSessionId },
      },
    });

    const getResponse = await client.send(getCommand);
    const currentSession = getResponse.Item
      ? (unmarshall(getResponse.Item) as CollabSessionType)
      : undefined;

    if (!currentSession) {
      throw new Error(`Can't find Parent Session with id ${parentSessionId}`);
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

    const updateCommand = new UpdateItemCommand({
      TableName: sessionsTableName,
      Key: {
        parentSessionId: { S: currentSession.parentSessionId },
        sessionid: { S: currentSession.parentSessionId },
      },
      UpdateExpression: 'SET #frames = :frames',
      ExpressionAttributeNames: { '#frames': 'frames' },
      ExpressionAttributeValues: {
        ':frames': {
          L: currentFrames.map((currentFrame) => ({
            M: {
              sessionid: { S: currentFrame.sessionid },
              frameid: { N: currentFrame.frameid.toString() },
            },
          })),
        },
      },
      ReturnValues: 'ALL_NEW',
    });

    const updateResponse = await client.send(updateCommand);
    if (!updateResponse.Attributes) {
      throw new Error('Unable to update Session');
    }

    return unmarshall(updateResponse.Attributes) as CollabSessionType;
  }
}
