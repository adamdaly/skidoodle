import { Frame } from "@/custom/types";

export enum LayerTypes {
  draw,
  erase,
}

export type FrameData = Frame & {
  data?: string;
  layers: {
    data: Blob;
    type: LayerTypes;
  }[];
  isDirty: boolean;
};

export enum AvailableTools {
  brush,
  eraser,
}

export type SceneOptions = {
  tool: AvailableTools;
  brushSize: number;
  maxLayers: number;
  color: string;
};
