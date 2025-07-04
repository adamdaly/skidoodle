import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CollabInvite {
  @Field(() => String, { description: '' })
  id: string;

  @Field(() => String, { description: '' })
  parentSessionId: string;

  @Field(() => Number, { description: '' })
  sceneid: number;

  @Field(() => String, { description: '' })
  email: string;

  @Field(() => String, { description: '' })
  pin: string;

  @Field(() => Number, { description: '' })
  expires: number;
}

@ObjectType()
export class CollabFrame {
  @Field(() => String, { description: 'Session Id' })
  sessionid: string;

  @Field(() => Int, { description: 'Frame Id' })
  frameid: number;
}

@ObjectType()
export class CollabSession {
  @Field(() => String, { description: 'Id' })
  sessionid: string;

  @Field(() => String, { description: 'Session Id', nullable: true })
  parentSessionId: string | null;

  @Field(() => String, { description: 'Email' })
  email: string;

  @Field(() => String, { description: 'Pin' })
  pin: string;

  @Field(() => String, { description: 'Expires On' })
  expires: number;

  @Field(() => [CollabFrame], {
    description: 'Selected Frames',
    nullable: true,
  })
  frames: CollabFrame[] | null;

  @Field(() => String, { description: 'Color' })
  color: string;
}

@ObjectType()
export class CollabPaint {
  @Field(() => String, { description: 'Session Id' })
  sessionid: string;

  @Field(() => Int, { description: 'Frame Id' })
  frameid: number;

  @Field(() => String, { description: 'Frame Data' })
  data: string;
}
