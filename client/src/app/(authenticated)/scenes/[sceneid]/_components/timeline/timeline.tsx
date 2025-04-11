"use client";
import { memo } from "react";
import { useScene } from "../context";

export const Timeline = memo(() => {
  const { frames } = useScene();

  return (
    <ul className="flex flex-nowrap overflow-x-scroll border-t border-border h-full">
      {frames.map((frame) => (
        <li
          key={frame.id}
          className="relative border-r border-border bg-gray-100 after:absolute after:top-[2px] after:left-[2px] after:block after:w-2 after:h-2 after:bg-gray-600 after:rounded-[4px]"
          style={{ width: frame.length * 20 }}
        ></li>
      ))}
    </ul>
  );
});

Timeline.displayName = "Timeline";
