"use client";
import { memo } from "react";
import { useScene } from "../context";

export const Canvas = memo(() => {
  const {
    animation,
    canvas,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  } = useScene();

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
        className: "w-full  shadow-[0px_0px_40px_rgba(0,0,0,0.25)]",
      }}
    />
  );
});

Canvas.displayName = "Canvas";
