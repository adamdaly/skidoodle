import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class CollabSession {
  @Prop({ type: Number })
  sceneid: number;

  @Prop({ type: String })
  parentSessionId: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  color: string;

  @Prop({ type: Number })
  expires: number;

  @Prop()
  frames: { sessionid: string; frameid: number }[];
}

export type CollabSessionDocument = HydratedDocument<CollabSession>;
export const CollabSessionSchema = SchemaFactory.createForClass(CollabSession);

@Schema()
export class CollabInvite {
  @Prop({ type: String })
  sessionid: string;

  @Prop({ type: String })
  parentSessionId: string;

  @Prop({ type: Number })
  sceneid: number;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  pin: string;

  @Prop({ type: Number })
  expires: number;
}

export type CollabCollabocument = HydratedDocument<CollabInvite>;
export const CollabInviteSchema = SchemaFactory.createForClass(CollabInvite);
