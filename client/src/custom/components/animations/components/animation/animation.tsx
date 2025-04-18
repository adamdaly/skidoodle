"use client";
import { useMemo } from "react";
import { useFramesContext } from "@/custom/components/frames";
import { Thumbnail } from "@/custom/components/thumbnail";
import { Animation as AnimationType } from "@/custom/types";

export type AnimationProps = AnimationType;

export const Animation = (animation: AnimationProps) => {
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
};
