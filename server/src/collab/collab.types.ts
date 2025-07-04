export type CollabInviteType = {
  id: string;
  parentSessionId: string;
  email: string;
  pin: string;
  expires: number;
};

export type CollabSessionType = {
  sceneid: number;
  parentSessionId: string;
  sessionid: string;
  email: string;
  color: string;
  expires: number;
  frames: { sessionid: string; frameid: number }[] | null;
};

export interface CollabService {
  createParentSession(
    sceneid: number,
    frameid: number,
    email: string,
  ): Promise<CollabSessionType>;
  invite(parentSessionId: string, email: string): Promise<CollabInviteType>;
  confirm(inviteid: string, pin: string): Promise<CollabSessionType>;
  getRootSession(sessionid: string): Promise<CollabSessionType | undefined>;
  getSessions(sessionid: string): Promise<CollabSessionType[] | undefined>;
  getFrameSelection(sessionid: string): Promise<CollabSessionType['frames']>;
  updateSession(
    parentSessionId: string,
    childSessionId: string,
    frameid: number,
  ): Promise<CollabSessionType>;
}
