"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useScene } from "../../../context";

const useTimelineLogic = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { animation, frames } = useScene();
  const aspectRatio = animation.width / animation.height;

  const [popoverOpen, setPopoverOpen] = useState(false);

  const onTimelineMouseEnter = () => {
    setPopoverOpen(true);
  };

  const onTimelineMouseLeave = () => {
    setPopoverOpen(false);
  };

  const onSelectedIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  const onOpenAutoFocus = () => {
    contextRef.current = canvasRef.current?.getContext("2d") ?? null;
    render();
  };

  const render = () => {
    const frame = frames[selectedIndex];

    if (frame?.data && contextRef.current) {
      const image = new Image();
      image.onload = () => {
        contextRef.current?.clearRect(0, 0, 240 * aspectRatio, 240);
        contextRef.current?.drawImage(image, 0, 0, 240 * aspectRatio, 240);
      };
      image.src = `data:image/png;base64,${frame.data}`;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(render, [selectedIndex]);

  return {
    frames,
    canvasRef,
    aspectRatio,
    popoverOpen,
    onTimelineMouseEnter,
    onTimelineMouseLeave,
    onSelectedIndexChange,
    onOpenAutoFocus,
  } as const;
};

const TimelineContext = createContext<
  ReturnType<typeof useTimelineLogic> | undefined
>(undefined);

export const useTimeline = () => {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error("useTimeline must be used within an TimelineProvider.");
  }

  return context;
};

type TimelineProviderProps = { children: ReactNode };

export const TimelineProvider = ({ children }: TimelineProviderProps) => {
  const value = useTimelineLogic();

  return (
    <TimelineContext.Provider {...{ value }}>
      {children}
    </TimelineContext.Provider>
  );
};
