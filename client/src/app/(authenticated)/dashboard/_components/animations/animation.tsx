"use client";
import Link from "next/link";
import { Animation as AnimationType } from "@/custom/types";
import { useFramesContext } from "../context";
import { useCallback, useEffect, useMemo, useRef } from "react";

export type AnimationProps = AnimationType;

export const Animation = (animation: AnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frames = useFramesContext();

  const animationFrames = useMemo(() => {
    return animation.Scene.map((scene) =>
      scene.Frame.map((frame) => frame.filename).flat()
    )
      .flat()
      .reduce((frameData, currentFrame) => {
        if (frames[currentFrame]) {
          frameData.push(frames[currentFrame]);
        }

        return frameData;
      }, [] as string[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames]);

  useEffect(() => {
    if (animationFrames.length > 0) {
      const context = canvasRef.current?.getContext("2d");

      if (context) {
        const img = new Image();
        img.src = `data:image/jpeg;base64,${animationFrames[0]}`;
        img.onload = () => {
          context.drawImage(img, 0, 0);
        };
      }
    }
  }, [animationFrames]);

  const index = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const render = useCallback(() => {
    timeout.current = setTimeout(() => {
      const context = canvasRef.current?.getContext("2d");

      if (context) {
        const img = new Image();
        img.src = `data:image/jpeg;base64,${
          animationFrames[index.current % animationFrames.length]
        }`;
        index.current += 1;
        img.onload = () => {
          context.clearRect(0, 0, animation.width, animation.height);
          context.drawImage(img, 0, 0);
        };
      }

      render();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationFrames]);

  const onMouseEnter = useCallback(() => {
    render();
  }, [render]);

  const onMouseLeave = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  return (
    <li
      key={animation.id}
      {...{
        onMouseEnter,
        onMouseLeave,
      }}
    >
      <Link href={`/animations/${animation.id}`} className="">
        <canvas
          ref={canvasRef}
          width={animation.width}
          height={animation.height}
          className="w-full"
        />
        {animation.name} {animation.id}
      </Link>
    </li>
  );
};
