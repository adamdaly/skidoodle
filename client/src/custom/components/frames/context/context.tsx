"use client";
import { getImageData } from "@/custom/utils/get-image-data";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type FramesProviderProps = {
  children: ReactNode;
  frames: string[];
};

type Frames = Record<string, string>;

export const Context = createContext({});

export const useFramesContext = () => useContext<Frames>(Context);

export const FramesProvider = ({ children, frames }: FramesProviderProps) => {
  const [images, setImages] = useState<Frames>({});

  const processStream = useCallback(async () => {
    if (frames.length === 0) {
      return;
    }

    try {
      getImageData(frames, ({ id, data }) => {
        setImages((currentImages) => ({
          ...currentImages,
          [id]: data,
        }));
      });
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
