import { useCallback, useEffect, useMemo, useState } from "react";
import { produce } from "immer";
import { Scene, Frame } from "@/custom/types";
import { getImageData } from "@/custom/utils/get-image-data";
import { deleteFrame, postFrame } from "@/custom/api/animation.api";

export const useFrames = (scene: Scene) => {
  const [frames, setFrames] = useState<(Frame & { data?: string })[]>(
    scene.Frame.map((frame) => ({ ...frame, data: undefined }))
  );
  const filenames = useMemo(
    () => scene.Frame.map((frame) => frame.filename),
    [scene.Frame]
  );

  const onFrameAdd = useCallback(async () => {
    const canvas = new OffscreenCanvas(1920, 1080);
    const context = canvas.getContext("2d");

    if (context) {
      context.fillStyle = "white";
      context.fillRect(0, 0, 1920, 1080);
      context.font = "100px sans-serif";
      context.fillStyle = "black";
      context.fillText((frames.length + 1).toString(), 100, 100);
    }

    const blob = await canvas.convertToBlob();
    const file = new File([blob], "image.png", { type: "image/png" });

    try {
      const response = await postFrame({
        file,
        length: Math.ceil(Math.random() * 4),
        index: frames.length + 1,
        sceneid: scene.id,
      });

      getFrameData(response.data);
    } catch (e) {
      console.log(e);
    }
  }, [frames.length]);

  const onFrameRemove = useCallback(async (frame: Frame) => {
    try {
      const response = await deleteFrame(frame.id);

      setFrames((currentFrames) => {
        const frameIndex = currentFrames.findIndex(
          (f) => f.id === response.data.id
        );
        return currentFrames.toSpliced(frameIndex, 1);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getFrameData = useCallback(async (frame: Frame) => {
    try {
      await getImageData([frame.filename], (data) => {
        setFrames((currentFrames) =>
          produce(currentFrames, (draft) => {
            draft.push({
              ...frame,
              data: data.data,
            });
          })
        );
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getInitialFramesData = useCallback(async () => {
    try {
      await getImageData(filenames, (data) => {
        setFrames((currentFrames) =>
          produce(currentFrames, (draft) => {
            const frameIndex = draft.findIndex((f) => f.filename === data.id);

            if (frameIndex > -1) {
              draft[frameIndex].data = data.data;
            }
          })
        );
      });
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getInitialFramesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    frames,
    onFrameAdd,
    onFrameRemove,
  } as const;
};
