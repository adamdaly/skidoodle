import {
  MouseLocationState,
  useMouseLocation,
} from "@/custom/hooks/use-mouse-location";
import { Animation, Scene } from "@/custom/types";
import { MouseEvent, useCallback, useEffect, useRef } from "react";

export const useCanvas = (animation: Animation, scene: Scene) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const canvasBoundingClientRect = useRef<DOMRect | null>(null);

  const getContext = () => {
    if (context.current) {
      return context.current;
    } else {
      context.current = canvas.current?.getContext("2d") ?? null;
      return context.current;
    }
  };

  const getInitialFrame = () => {
    const frame = scene.Frame[0];

    if (frame) {
      const img = new Image();
      img.onload = () => {
        getContext()?.clearRect(0, 0, animation.width, animation.height);
        getContext()?.drawImage(img, 0, 0);
      };
      img.src = `http://localhost:3003/frames/${frame.filename}`;
    }
  };

  useEffect(() => {
    getInitialFrame();
  }, []);

  const getCanvasBoundingClientRect = () => {
    if (canvasBoundingClientRect.current) {
      return canvasBoundingClientRect.current;
    }
    if (canvas.current) {
      canvasBoundingClientRect.current = canvas.current.getBoundingClientRect();
      return canvasBoundingClientRect.current;
    }

    return document.body.getBoundingClientRect();
  };

  const render = useCallback(
    (_e: MouseEvent<HTMLCanvasElement>, state: MouseLocationState) => {
      const { width, height } = getCanvasBoundingClientRect();

      const pctOfX = state.relativeOffsetX / width;
      const pctOfY = state.relativeOffsetY / height;

      const realPointX = animation.width * pctOfX;
      const realPointY = animation.height * pctOfY;

      context.current?.fillRect(realPointX, realPointY, 10, 10);
      console.log(context.current);
    },
    [context.current]
  );

  const onCanvasMouseDown = useCallback(render, [render]);
  const onCanvasMouseMove = useCallback(render, [render]);

  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useMouseLocation({
      mouseDown: onCanvasMouseDown,
      mouseMove: onCanvasMouseMove,
      mouseUp: () => {},
    });

  return {
    canvas,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  } as const;
};
