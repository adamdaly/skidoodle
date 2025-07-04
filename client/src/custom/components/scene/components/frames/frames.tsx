"use client";
import { memo, useCallback, useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ConfirmAlert } from "@/custom/components/confirm-alert";
import { Animation } from "@/custom/types";
import { useScene } from "../context";

type FrameProps = {
  id: number;
  isSelected: boolean;
} & Pick<Animation, "width" | "height">;

const Frame = memo(({ id, isSelected, width, height }: FrameProps) => {
  const {
    onFrameRemove,
    onFrameSelect,
    framesFamily,
    sessions,
    selectedFrames,
  } = useScene();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const frame = useAtomValue(framesFamily(id));

  const selectedFrame = selectedFrames.find((frame) => frame.frameid === id);

  const associatedSession = sessions.find(
    (session) => session.sessionid === selectedFrame?.sessionid
  );

  const hasAssociatedSession = !!associatedSession;

  const color = associatedSession?.color ?? "#EAEAEA";

  useEffect(() => {
    if (frame?.data && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      const img = new Image();
      img.src = `data:image/png;base64,${frame?.data}`;

      img.onload = () => {
        context?.clearRect(0, 0, width, height);
        context?.drawImage(img, 0, 0);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame?.data]);

  const onConfirm = useCallback(() => {
    if (frame) {
      onFrameRemove(frame);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = useCallback(() => {
    onFrameSelect(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li className="relative aspect-16/9 flex-none flex-s border-r border-border last:border-0">
      <button
        className="block w-full h-full cursor-pointer border-2 border-solid border-transparent"
        onClick={!hasAssociatedSession ? onClick : undefined}
        style={{
          borderColor: isSelected || hasAssociatedSession ? color : undefined,
        }}
      >
        {associatedSession && (
          <div
            className="absolute left-2 top-2 text-xs"
            style={{
              color,
            }}
          >
            {associatedSession.email}
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full h-full"
        />
      </button>
      <Popover>
        <PopoverTrigger asChild>
          <button className="absolute top-4 right-4 p-1 bg-white rounded-2xl shadow cursor-pointer">
            <Ellipsis />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <ConfirmAlert
            {...{
              triggerText: "Remove Frame",
              triggerTestId: "cta-frame-delete",
              description: "This frame will be permanently deleted!",
              onConfirm,
              onCancel: () => {},
            }}
          />
        </PopoverContent>
      </Popover>
    </li>
  );
});

Frame.displayName = "Frame";

export const Frames = memo(() => {
  const {
    animation: { width, height },
    frames,
    onFrameAdd,
    selected,
  } = useScene();

  return (
    <div className="relative overflow-hidden border-t border-border h-full">
      <ul
        data-testid="list-frames"
        className="flex flex-nowrap overflow-x-scroll h-full"
      >
        {frames.map((frame, index) => (
          <Frame
            key={frame.filename}
            {...{
              id: frame.id,
              index,
              width,
              height,
              isSelected: selected === frame.id,
            }}
          />
        ))}
      </ul>
      <Button
        data-testid="cta-frame-create"
        className="absolute top-4 left-4"
        onClick={onFrameAdd}
      >
        Add Frame
      </Button>
    </div>
  );
});

Frames.displayName = "Frames";
