"use client";
import { memo } from "react";
import { Redo, Undo, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScene } from "../context";

export const Controls = memo(() => {
  const { undo, redo, frame, onFrameSave } = useScene();

  return (
    <div className="flex flex-row justify-end gap-2">
      <Button
        {...{
          variant: "outline",
          className: "cursor-pointer",
          size: "icon",
          onClick: undo,
          "data-testid": "scene-controls-undo",
        }}
      >
        <Undo />
      </Button>
      <Button
        {...{
          variant: "outline",
          className: "cursor-pointer",
          size: "icon",
          onClick: redo,
          "data-testid": "scene-controls-redo",
        }}
      >
        <Redo />
      </Button>
      <div className="relative">
        <Button
          {...{
            variant: "outline",
            className: "cursor-pointer",
            size: "icon",
            onClick: onFrameSave,
            "data-testid": "scene-controls-save",
            disabled: !frame?.isDirty,
          }}
        >
          <Save />
        </Button>
        {frame?.isDirty && (
          <div className="absolute top-[-2] right-[-2] w-2 h-2 rounded-full bg-red-700" />
        )}
      </div>
    </div>
  );
});

Controls.displayName = "Controls";
