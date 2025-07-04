import { useCallback, useEffect, useRef, useState } from "react";
import { AvailableTools } from "../../../types";

export const useCursor = (size: number, currentTool?: AvailableTools) => {
  const canvas = useRef<OffscreenCanvas | undefined>(undefined);
  const context = useRef<OffscreenCanvasRenderingContext2D | null>(null);
  const [cursor, setCursor] = useState("pointer");

  const getOffscreenCanvas = useCallback(() => {
    if (canvas.current) {
      return canvas.current;
    }

    canvas.current = new OffscreenCanvas(size * 2, size * 2);
    return canvas.current;
  }, [size]);

  const getContext = useCallback(() => {
    if (context.current) {
      return context.current;
    }

    return getOffscreenCanvas()?.getContext("2d");
  }, [getOffscreenCanvas]);

  const getCursor = useCallback(() => {
    const currentOffscreenCanvas = getOffscreenCanvas();
    const currentContext = getContext();

    if (currentContext) {
      currentContext.clearRect(0, 0, size * 2, size * 2);
      currentContext.beginPath();
      currentContext.arc(size / 2 + 1, size / 2 + 1, size / 2, 0, Math.PI * 2);
      currentContext.closePath();
      currentContext.strokeStyle = "rgba(0, 0, 0, 1)";
      currentContext.stroke();
    }

    if (
      currentTool !== undefined &&
      [AvailableTools.brush, AvailableTools.eraser].includes(currentTool)
    ) {
      currentOffscreenCanvas?.convertToBlob().then((blob) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const dataURL = e.target?.result;

          if (dataURL) {
            setCursor(`url("${dataURL}") ${size / 2} ${size / 2}, pointer`);
          }
        };
        fileReader.readAsDataURL(blob);
      });
    }
  }, [getOffscreenCanvas, getContext, currentTool, size]);

  useEffect(() => {
    getCursor();
  }, [getCursor]);

  return cursor;
};
