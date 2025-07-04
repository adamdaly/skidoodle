"use client";
import { memo } from "react";
import { useAtomValue } from "jotai";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { useScene } from "../context";
import { TimelineProvider, useTimeline } from "./components/context";
import { FlipBook } from "./components/flipbook";

export type TimelineItemProps = {
  id: number;
  index: number;
};

export const TimelineItem = memo(({ id, index }: TimelineItemProps) => {
  const { framesFamily } = useScene();
  const frame = useAtomValue(framesFamily(id))!;
  const { onSelectedIndexChange } = useTimeline();

  const onMouseEnter = () => {
    onSelectedIndexChange(index);
  };

  return (
    <li
      {...{
        className:
          "relative flex-grow-0 flex-shrink-0 border-r border-border bg-gray-100 after:absolute after:top-[2px] after:left-[2px] after:block after:w-2 after:h-2 after:bg-gray-600 after:rounded-[4px]",
        style: { width: frame.length * 20 },
        onMouseEnter,
      }}
    />
  );
});

TimelineItem.displayName = "TimelineItem";

export const Timeline = memo(() => {
  return (
    <TimelineProvider>
      <TimelineView />
    </TimelineProvider>
  );
});

Timeline.displayName = "Timeline";

export const TimelineView = memo(() => {
  const {
    frames,
    popoverOpen,
    onTimelineMouseEnter,
    onTimelineMouseLeave,
    onOpenAutoFocus,
  } = useTimeline();

  return (
    <Popover
      {...{
        open: popoverOpen,
      }}
    >
      <PopoverAnchor asChild>
        <ul
          {...{
            className:
              "flex flex-nowrap overflow-x-scroll border-t border-border h-full",
            onMouseEnter: onTimelineMouseEnter,
            onMouseLeave: onTimelineMouseLeave,
          }}
        >
          {frames.map((frame, index) => (
            <TimelineItem key={frame.id} {...{ id: frame.id, index }} />
          ))}
        </ul>
      </PopoverAnchor>
      <PopoverContent
        {...{
          side: "top",
          onOpenAutoFocus,
          className: "w-auto",
        }}
      >
        <FlipBook />
      </PopoverContent>
    </Popover>
  );
});

TimelineView.displayName = "TimelineView";
