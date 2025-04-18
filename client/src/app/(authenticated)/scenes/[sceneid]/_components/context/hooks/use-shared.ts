import { useCallback, useEffect, useMemo, useState } from "react";
import { produce } from "immer";
import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";

import { Animation, Scene } from "@/custom/types";
import { getImageData } from "@/custom/utils/get-image-data";
import { AvailableTools, FrameData, SceneOptions } from "../../../_types";

export const useShared = (animation: Animation, scene: Scene) => {
  const [options, setOptions] = useState<SceneOptions>({
    maxLayers: 10,
    brushSize: 20,
    tool: AvailableTools.brush,
    color: "#000000",
  });

  const initialFrames = useMemo(
    () =>
      scene.Frame.reduce((accu, curr) => {
        accu.push({
          ...curr,
          layers: [],
          isDirty: false,
        });
        return accu;
      }, [] as FrameData[]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const framesAtom = useMemo(() => atom(initialFrames), [initialFrames]);

  const [frames, setFramesAtom] = useAtom(framesAtom);

  const framesFamily = useMemo(
    () =>
      atomFamily((id: number) =>
        atom<FrameData | undefined, [Partial<FrameData>], void>(
          (get) => {
            const currentFrames = get(framesAtom);
            return currentFrames.find((frame) => frame.id === id);
          },
          (get, set, update) => {
            const currentFrames = get(framesAtom);

            const updatedFrames = produce(currentFrames, (draft) => {
              const updateIndex = draft.findIndex(
                (currentFrame) => currentFrame.id === id
              );

              draft[updateIndex] = {
                ...draft[updateIndex],
                ...update,
              };
            });

            set(framesAtom, updatedFrames);
          }
        )
      ),
    []
  );

  const [selected, setSelected] = useState(initialFrames[0]?.id);

  // TODO - Get Thumbnails instead
  const getInitialFramesData = useCallback(async () => {
    const filenames = frames.map((frame) => frame.filename);

    await getImageData(filenames, (data) => {
      setFramesAtom((currentFrames) =>
        produce(currentFrames, (draft) => {
          const frameIndex = draft.findIndex((f) => f.filename === data.id);
          if (frameIndex > -1) {
            draft[frameIndex].data = data.data;
          }
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getInitialFramesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [frame, setFrame] = useAtom(framesFamily(selected));

  return {
    options,
    setOptions,
    animation,
    scene,
    frames,
    setFramesAtom,
    framesFamily,
    selected,
    setSelected,
    frame,
    setFrame,
  };
};

export type Shared = ReturnType<typeof useShared>;
