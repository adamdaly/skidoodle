"use client";

import { memo } from "react";
import { useScene } from "../context";
import { H3 } from "@/custom/components/typography";

export const Info = memo(() => {
  const { animation, scene, frame } = useScene();

  const dlClass = "grid grid-cols-[auto_1fr] gap-2 mb-4 whitespace-nowrap";
  const dtClass = "font-medium";
  const ddClass = "text-gray-600 overflow-hidden text-ellipsis";

  return (
    <div className="p-4">
      <H3>Animation</H3>
      <dl className={dlClass}>
        <dt className={dtClass}>Name:</dt>
        <dd className={ddClass} title={animation.name}>
          {animation.name}
        </dd>
        <dt className={dtClass}>Width:</dt>
        <dd className={ddClass}>{animation.width}</dd>
        <dt className={dtClass}>Height:</dt>
        <dd className={ddClass}>{animation.height}</dd>
        <dt className={dtClass}>Frame Rate:</dt>
        <dd className={ddClass}>{animation.framerate}</dd>
      </dl>
      <H3>Scene</H3>
      <dl className={dlClass}>
        <dt className={dtClass}>Name:</dt>
        <dd className={ddClass} title={scene.name}>
          {scene.name}
        </dd>
      </dl>
      {frame && (
        <>
          <H3>Frame</H3>
          <dl className={dlClass}>
            <dt className={dtClass}>Index:</dt>
            <dd className={ddClass}>{frame.index + 1}</dd>
            <dt className={dtClass}>Length:</dt>
            <dd className={ddClass}>{frame.length}</dd>
          </dl>
        </>
      )}
    </div>
  );
});

Info.displayName = "Info";
