"use client";
import { memo, useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useScene } from "../context";

export const Frames = memo(() => {
  const { frames, onFrameAdd } = useScene();

  const framesRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const df = document.createDocumentFragment();

    frames.forEach((frame) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1920;
      canvas.height = 1080;
      canvas.style.width = "640px";
      canvas.style.height = "320px";
      const context = canvas.getContext("2d");

      context?.drawImage(frame[1], 0, 0);
      df.appendChild(canvas);
    });

    framesRef.current?.replaceChildren(df);
  }, [frames]);

  return (
    <>
      <div ref={framesRef} />
      <Button onClick={onFrameAdd}>Add Frame</Button>
    </>
  );
});

Frames.displayName = "Frames";
