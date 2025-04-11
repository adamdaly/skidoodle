"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useFramesContext } from "@/custom/components/frames";
import { Thumbnail } from "@/custom/components/thumbnail";
import { Animation as AnimationType } from "@/custom/types";

export type AnimationProps = AnimationType;

export const Animation = (animation: AnimationProps) => {
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
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

  return (
    <Thumbnail
      {...{
        frames: animationFrames,
        width: animation.width,
        height: animation.height,
        href: `/animations/${animation.id}`,
        label: animation.name,
      }}
    />
  );

  // useEffect(() => {
  //   if (animationFrames.length > 0) {
  //     const context = canvasRef.current?.getContext("2d");

  //     if (context) {
  //       const img = new Image();
  //       img.src = `data:image/jpeg;base64,${animationFrames[0]}`;
  //       img.onload = () => {
  //         context.drawImage(img, 0, 0);
  //       };
  //     }
  //   }
  // }, [animationFrames]);

  // const index = useRef(0);
  // const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // const render = useCallback(() => {
  //   timeout.current = setTimeout(() => {
  //     const context = canvasRef.current?.getContext("2d");

  //     if (context) {
  //       const img = new Image();
  //       img.src = `data:image/jpeg;base64,${
  //         animationFrames[index.current % animationFrames.length]
  //       }`;
  //       index.current += 1;
  //       img.onload = () => {
  //         context.clearRect(0, 0, animation.width, animation.height);
  //         context.drawImage(img, 0, 0);
  //       };
  //     }

  //     render();
  //   }, 100);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [animationFrames]);

  // const onMouseEnter = useCallback(() => {
  //   render();
  // }, [render]);

  // const onMouseLeave = useCallback(() => {
  //   if (timeout.current) {
  //     clearTimeout(timeout.current);
  //   }
  // }, []);

  // return (
  //   <li
  //     key={animation.id}
  //     {...{
  //       onMouseEnter,
  //       onMouseLeave,
  //     }}
  //   >
  //     <Link href={`/animations/${animation.id}`} className="relative">
  //       <canvas
  //         ref={canvasRef}
  //         width={animation.width}
  //         height={animation.height}
  //         className="w-full"
  //       />
  //       <span className="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center font-heading key">
  //         {animation.name}
  //       </span>
  //     </Link>
  //   </li>
  // );
};
