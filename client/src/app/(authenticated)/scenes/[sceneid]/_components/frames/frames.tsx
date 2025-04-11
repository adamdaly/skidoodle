"use client";
import { memo, useEffect, useRef } from "react";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ConfirmAlert } from "@/custom/components/confirm-alert";
import { Animation, Frame as FrameType } from "@/custom/types";
import { useScene } from "../context";

type FrameProps = FrameType & {
  data?: string; // base64
} & Pick<Animation, "width" | "height">;

const Frame = memo(({ width, height, data, ...frame }: FrameProps) => {
  const { onFrameRemove } = useScene();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (data && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      const img = new Image();
      img.src = `data:image/jpeg;base64,${data}`;

      img.onload = () => {
        context?.clearRect(0, 0, width, height);
        context?.drawImage(img, 0, 0);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onConfirm = () => {
    onFrameRemove(frame);
  };

  return (
    <div className="relative aspect-16/9 flex-none flex-s border-r border-border last:border-0">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full"
      />
      <Popover>
        <PopoverTrigger asChild>
          <button className="absolute top-4 right-4 p-1 bg-white rounded-2xl shadow cursor-pointer">
            <Ellipsis />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <ConfirmAlert
            {...{
              triggerText: "Remove Frame",
              description: "This frame will be permanently deleted!",
              onConfirm,
              onCancel: () => {},
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});

Frame.displayName = "Frame";

export const Frames = memo(() => {
  const {
    animation: { width, height },
    frames,
    onFrameAdd,
  } = useScene();

  return (
    <div className="relative overflow-hidden border-t border-border h-full">
      <div className="flex flex-nowrap overflow-x-scroll h-full">
        {frames.map((frame) => (
          <Frame key={frame.filename} {...{ ...frame, width, height }} />
        ))}
      </div>
      <Button className="absolute top-4 left-4" onClick={onFrameAdd}>
        Add Frame
      </Button>
    </div>
  );
});

Frames.displayName = "Frames";
