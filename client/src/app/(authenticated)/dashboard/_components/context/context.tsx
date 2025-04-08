"use client";
import { Animation } from "@/custom/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type FramesProviderProps = {
  children: ReactNode;
  animations: Animation[];
};

type Frames = Record<string, string>;

export const Context = createContext({});

export const useFramesContext = () => useContext<Frames>(Context);

export const FramesProvider = ({
  children,
  animations,
}: FramesProviderProps) => {
  const [images, setImages] = useState<Frames>({});

  const frames = useMemo(
    () => [
      ...new Set(
        animations
          .map((animation) =>
            animation.Scene.map((scene) =>
              scene.Frame.map((frame) => frame.filename).flat()
            ).flat()
          )
          .flat()
      ),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const processStream = useCallback(async () => {
    if (frames.length === 0) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3003/frames", {
        method: "post",
        body: JSON.stringify({
          frames,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const reader = response.body?.getReader();
      if (!reader) {
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done || value === undefined) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
          if (!line) {
            continue;
          }

          const { id, data } = JSON.parse(line);

          setImages((currentImages) => ({
            ...currentImages,
            [id]: data,
          }));
        }
      }
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    processStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Context.Provider value={images}>{children}</Context.Provider>;
};
