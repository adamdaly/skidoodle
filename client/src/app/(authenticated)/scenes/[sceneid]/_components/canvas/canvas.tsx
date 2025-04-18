"use client";
import { memo } from "react";
import { useScene } from "../context";
import { AvailableTools } from "../../_types";

const getCursor = (size: number, currentTool?: AvailableTools) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = size + 2;
  canvas.height = size + 2;

  if (context) {
    context.beginPath();
    context.arc(size / 2 + 1, size / 2 + 1, size / 2, 0, Math.PI * 2);
    context.closePath();
    context.strokeStyle = "rgba(0, 0, 0, 1)";
    context.stroke();
  }

  if (
    currentTool !== undefined &&
    [AvailableTools.brush, AvailableTools.eraser].includes(currentTool)
  ) {
    return `url("${canvas.toDataURL()}") ${size / 2} ${size / 2}, pointer`;
  }

  return "pointer";
};

export const Canvas = memo(() => {
  const {
    animation,
    canvas,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    options,
  } = useScene();

  // Canvas scales with screen size
  const scaleMultiplier = canvas.current?.width
    ? canvas.current.offsetWidth / animation.width
    : 1;

  const cursor = getCursor(options.brushSize * scaleMultiplier, options.tool);

  return (
    <canvas
      ref={canvas}
      {...{
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
        width: animation.width,
        height: animation.height,
        className: "w-full shadow-[0px_0px_40px_rgba(0,0,0,0.25)]",
        style: {
          backgroundPosition: `0px 0px, 10px 10px`,
          backgroundSize: "20px 20px",
          backgroundImage: `linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%)`,
          cursor,
        },
      }}
    />
  );
});

Canvas.displayName = "Canvas";
