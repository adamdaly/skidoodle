"use client";
import { memo } from "react";
import { Brush, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvailableTools } from "../../types";
import { useScene } from "../context";

export const Tools = memo(() => {
  const { options, onColorChange, onToolChange, onBrushSizeChange } =
    useScene();

  return (
    <div className="container grid gap-2 p-1">
      <div className="container grid grid-cols-2 grid-rows-1 gap-2">
        <Button
          {...{
            variant:
              options.tool === AvailableTools.brush ? "secondary" : "outline",
            className: "cursor-pointer",
            size: "icon",
            onClick: onToolChange(AvailableTools.brush),
            "data-testid": "scene-tools-brush",
          }}
        >
          <Brush />
        </Button>
        <Button
          {...{
            variant:
              options.tool === AvailableTools.eraser ? "secondary" : "outline",
            className: "cursor-pointer",
            size: "icon",
            onClick: onToolChange(AvailableTools.eraser),
            "data-testid": "scene-tools-eraser",
          }}
        >
          <Eraser />
        </Button>
      </div>
      <Input
        {...{
          type: "number",
          min: 0,
          value: options.brushSize,
          onChange: onBrushSizeChange,
        }}
      />
      <Input
        {...{
          type: "color",
          onChange: onColorChange,
          value: options.color,
        }}
      />
    </div>
  );
});

Tools.displayName = "Tools";
