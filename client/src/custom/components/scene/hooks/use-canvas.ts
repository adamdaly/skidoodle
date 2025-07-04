import { MouseEvent, useCallback, useEffect, useMemo, useRef } from "react";
import {
  MouseLocationState,
  useMouseLocation,
} from "@/custom/hooks/use-mouse-location";
import { debounce } from "@/custom/utils/debounce";
import { getImageData } from "@/custom/utils/get-image-data";
import { Shared } from "./use-shared";
import { AvailableTools, LayerTypes } from "../types";

export const useCanvas = ({
  animation,
  options,
  selected,
  frame,
  setFrame,
}: Shared) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const canvasBoundingClientRect = useRef<DOMRect | null>(null);

  type CanvasLayer = { canvas: OffscreenCanvas; type: LayerTypes };

  const layers = useRef<CanvasLayer[]>([]);
  const redoLayers = useRef<CanvasLayer[]>([]);
  const offscreenCanvasContext =
    useRef<OffscreenCanvasRenderingContext2D | null>(null);

  const types = useMemo(
    () => ({
      [AvailableTools.brush]: LayerTypes.draw,
      [AvailableTools.eraser]: LayerTypes.erase,
    }),
    []
  );

  const update = useCallback(async () => {
    const layersAsBlobs = await Promise.all(
      layers.current.map(async (layer) => ({
        data: await layer.canvas.convertToBlob(),
        type: layer.type,
      }))
    );

    const data = canvas.current?.toDataURL().split(",")[1] ?? "";

    setFrame({
      ...frame,
      data,
      layers: layersAsBlobs,
      isDirty: true,
    });
  }, [frame, setFrame]);

  const debouncedUpdate = useMemo(() => debounce(update, 10), [update]);

  const render = useCallback(
    (shouldUpdate = true) => {
      const currentContext = getContext()!;
      currentContext.clearRect(0, 0, animation.width, animation.height);

      layers.current.forEach((layer) => {
        currentContext.globalCompositeOperation =
          layer.type === LayerTypes.draw ? "source-over" : "destination-out";
        currentContext.drawImage(layer.canvas, 0, 0);
      });

      if (shouldUpdate) {
        debouncedUpdate();
      }
    },
    [debouncedUpdate]
  );

  const getContext = useCallback(() => {
    if (context.current) {
      return context.current;
    } else {
      context.current = canvas.current?.getContext("2d") ?? null;
      return context.current;
    }
  }, []);

  const initialiseFrame = useCallback(async () => {
    if (!frame) {
      return;
    }

    if (frame.layers.length) {
      layers.current = await Promise.all(
        frame.layers.map(async (layer) => {
          const layerOffscreenCanvas = new OffscreenCanvas(
            animation.width,
            animation.height
          );
          const layerContext = layerOffscreenCanvas.getContext("2d");
          const bitmap = await createImageBitmap(layer.data);
          layerContext?.drawImage(bitmap, 0, 0);
          return {
            canvas: layerOffscreenCanvas,
            type: layer.type,
          };
        })
      );
      render(false);
    } else {
      await getImageData([frame.filename], (data) => {
        const img = new Image();

        img.onload = () => {
          const initialCanvas = new OffscreenCanvas(
            animation.width,
            animation.height
          );
          const initialContext = initialCanvas.getContext("2d");
          initialContext?.drawImage(img, 0, 0);

          layers.current = [{ canvas: initialCanvas, type: LayerTypes.draw }];
          render(false);
        };
        img.src = `data:image/png;base64,${data.data}`;
      });
    }
  }, [frame, render]);

  useEffect(() => {
    initialiseFrame();
  }, [selected]);

  const getCanvasBoundingClientRect = useCallback(() => {
    if (canvasBoundingClientRect.current) {
      return canvasBoundingClientRect.current;
    }
    if (canvas.current) {
      canvasBoundingClientRect.current = canvas.current.getBoundingClientRect();
      return canvasBoundingClientRect.current;
    }

    return document.body.getBoundingClientRect();
  }, []);

  const getRealPosition = useCallback(
    (currentX: number, currentY: number) => {
      const { width, height } = getCanvasBoundingClientRect();

      const pctOfX = currentX / width;
      const pctOfY = currentY / height;

      return {
        x: animation.width * pctOfX,
        y: animation.height * pctOfY,
      };
    },
    [animation.height, animation.width]
  );

  const onCanvasMouseDown = useCallback(
    (_e: MouseEvent<HTMLCanvasElement>, state: MouseLocationState) => {
      // Reset the redo layers
      redoLayers.current = [];

      const offscreenCanvas = new OffscreenCanvas(
        animation.width,
        animation.height
      );

      layers.current.push({
        canvas: offscreenCanvas,
        type: types[options.tool],
      });

      // Compress layers below max layer number
      if (layers.current.length > options.maxLayers) {
        const bottomCanvas = layers.current.shift();
        const bottomCanvasContext = bottomCanvas?.canvas.getContext("2d");
        const targetCanvas = layers.current[0];

        if (bottomCanvas && bottomCanvasContext) {
          bottomCanvasContext.globalCompositeOperation =
            targetCanvas.type === LayerTypes.draw
              ? "source-over"
              : "destination-out";

          bottomCanvasContext.drawImage(targetCanvas.canvas, 0, 0);
          layers.current[0] = bottomCanvas;
        }
      }

      offscreenCanvasContext.current = offscreenCanvas.getContext("2d");

      offscreenCanvasContext.current?.beginPath();

      const { x, y } = getRealPosition(
        state.relativeOffsetX,
        state.relativeOffsetY
      );

      offscreenCanvasContext.current?.moveTo(x, y);
    },
    [animation.height, animation.width, getRealPosition, options]
  );

  const onCanvasMouseMove = useCallback(
    (_e: MouseEvent<HTMLCanvasElement>, state: MouseLocationState) => {
      const { x, y } = getRealPosition(
        state.relativeOffsetX,
        state.relativeOffsetY
      );

      if (offscreenCanvasContext.current) {
        offscreenCanvasContext.current.lineWidth = options.brushSize;
        offscreenCanvasContext.current.strokeStyle = options.color;
        offscreenCanvasContext.current.lineCap = "round";
        offscreenCanvasContext.current.lineTo(x, y);
        offscreenCanvasContext.current.stroke();
      }

      render();
    },
    [options, render]
  );

  const onCanvasMouseUp = useCallback(() => {
    getContext()?.closePath();
  }, []);

  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useMouseLocation({
      mouseDown: onCanvasMouseDown,
      mouseMove: onCanvasMouseMove,
      mouseUp: onCanvasMouseUp,
    });

  const undo = useCallback(() => {
    if (layers.current.length > 1) {
      redoLayers.current.push(layers.current.pop()!);

      render();
    }
  }, [render]);

  const redo = useCallback(() => {
    const shifted = redoLayers.current.pop();

    if (shifted) {
      layers.current.push(shifted);
    }

    render();
  }, [render]);

  return {
    canvas,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    undo,
    redo,
  } as const;
};
