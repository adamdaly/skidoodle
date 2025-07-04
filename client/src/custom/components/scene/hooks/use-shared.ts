import { useCallback, useEffect, useMemo, useState } from "react";
import { produce } from "immer";
import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";

import { Animation, CollabSession, Scene } from "@/custom/types";
import { getImageData } from "@/custom/utils/get-image-data";
import { AvailableTools, FrameData, SceneOptions } from "../types";

export const useShared = (
  animation: Animation,
  scene: Scene,
  collabSession: CollabSession | null
) => {
  const [options, setOptions] = useState<SceneOptions>({
    maxLayers: 10,
    brushSize: 20,
    tool: AvailableTools.brush,
    color: "#000000",
  });

  const initialFrames: FrameData[] = useMemo(
    () =>
      scene.Frame.map((frame) => ({
        ...frame,
        layers: [],
        isDirty: false,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const framesAtom = useMemo(() => atom(initialFrames), [initialFrames]);

  const [frames, setFramesAtom] = useAtom(framesAtom);

  const framesFamily = useMemo(
    () =>
      atomFamily((id: number | null) =>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [selected, setSelected] = useState(
    collabSession ? collabSession.sceneid : initialFrames[0]?.id
  );

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

  const setFrameById = useCallback((id: number, update: Partial<FrameData>) => {
    setFramesAtom((currentFrames) =>
      produce(currentFrames, (draft) => {
        const index = draft.findIndex((currentFrame) => currentFrame.id === id);

        if (index > -1) {
          draft[index] = {
            ...draft[index],
            ...update,
          };
        }
      })
    );
  }, []);

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
    collabSession,
    setFrameById,
  };
};

export type Shared = ReturnType<typeof useShared>;
