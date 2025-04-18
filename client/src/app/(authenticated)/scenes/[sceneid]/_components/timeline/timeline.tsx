"use client";
import { memo } from "react";
import { useScene } from "../context";
import { useAtomValue } from "jotai";

export type TimelineItemProps = {
  id: number;
};

export const TimelineItem = memo(({ id }: TimelineItemProps) => {
  const { framesFamily } = useScene();

  const frame = useAtomValue(framesFamily(id))!;

  return (
    <li
      className="relative flex-grow-0 flex-shrink-0 border-r border-border bg-gray-100 after:absolute after:top-[2px] after:left-[2px] after:block after:w-2 after:h-2 after:bg-gray-600 after:rounded-[4px]"
      style={{ width: frame.length * 20 }}
    />
  );
});

TimelineItem.displayName = "TimelineItem";

export const Timeline = memo(() => {
  const { frames } = useScene();

  return (
    <ul className="flex flex-nowrap overflow-x-scroll border-t border-border h-full">
      {frames.map((frame) => (
        <TimelineItem key={frame.id} id={frame.id} />
      ))}
    </ul>
  );
});

Timeline.displayName = "Timeline";
