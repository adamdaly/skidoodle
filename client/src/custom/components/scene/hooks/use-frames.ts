import { useCallback } from "react";
import { produce } from "immer";
import { Frame } from "@/custom/types";
import {
  deleteFrame,
  patchFrame,
  postFrame,
} from "@/custom/api/animation.api/client";
import { createFileFromData } from "../utils/create-file-from-data";
import { Shared } from "./use-shared";

export const useFrames = ({
  animation,
  scene,
  frames,
  frame,
  setFrame,
  setFramesAtom,
  setSelected,
}: Shared) => {
  const onFrameAdd = useCallback(async () => {
    const canvas = new OffscreenCanvas(animation.width, animation.height);
    canvas.getContext("2d");

    const blob = await canvas.convertToBlob();
    const file = new File([blob], "image.png", { type: "image/png" });

    try {
      const response = await postFrame({
        file,
        length: Math.ceil(Math.random() * 4),
        index: frames.length + 1,
        sceneid: scene.id,
      });

      setFramesAtom((currentFrames) => [
        ...currentFrames,
        {
          ...response.data,
          layers: [],
          isDirty: false,
        },
      ]);

      setSelected(response.data.id);
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames.length]);

  const onFrameRemove = useCallback(async (frame: Frame) => {
    try {
      const response = await deleteFrame(frame.id);

      setFramesAtom((currentFrames) => {
        const frameIndex = currentFrames.findIndex(
          (f) => f.id === response.data.id
        );
        return currentFrames.toSpliced(frameIndex, 1);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onFrameSave = useCallback(async () => {
    if (!(frame && frame.data)) {
      // TODO - handle this
      return;
    }

    try {
      const file = await createFileFromData(
        animation.width,
        animation.height,
        frame.data,
        frame.filename
      );

      const response = await patchFrame(frame.id, {
        file,
        index: frame.index,
      });

      setFrame({
        ...frame,
        ...response.data,
        isDirty: false,
      });
    } catch (e) {
      console.log(e);
    }
  }, [frame]);

  const onFrameSelect = useCallback((id: number) => {
    setSelected(id);
  }, []);

  const updateFrameLengthOptimistic = useCallback(
    (id: number, frameLength: number) => {
      setFramesAtom((currentFrames) => {
        const index = currentFrames.findIndex(
          (currentFrame) => currentFrame.id === id
        );

        return produce(currentFrames, (draft) => {
          if (index > -1) {
            draft[index].length = frameLength;
          }
        });
      });
    },
    []
  );

  return {
    onFrameAdd,
    onFrameRemove,
    onFrameSelect,
    onFrameSave,
    updateFrameLengthOptimistic,
  } as const;
};
