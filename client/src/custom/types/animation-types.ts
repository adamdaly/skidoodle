export type Frame = {
  id: number;
  index: number;
  length: number;
  filename: string;
  sceneid: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export type Scene = {
  id: number;
  name: string;
  userid: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  index: number;
  animationid: number;
  Frame: Frame[];
};

export type Animation = {
  id: number;
  name: string;
  width: number;
  height: number;
  framerate: number;
  userid: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  Scene: Scene[];
};
