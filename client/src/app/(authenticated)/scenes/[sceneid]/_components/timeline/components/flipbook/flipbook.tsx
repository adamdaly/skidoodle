import { memo } from "react";
import { useTimeline } from "../context";

export const FlipBook = memo(() => {
  const { canvasRef, aspectRatio } = useTimeline();

  return <canvas ref={canvasRef} width={240 * aspectRatio} height="240" />;
});

FlipBook.displayName = "FlipBook";
