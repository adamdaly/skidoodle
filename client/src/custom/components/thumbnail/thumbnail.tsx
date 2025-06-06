"use client";
import { memo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";

export type ThumbnailProps = {
  frames: string[]; // base64[]
  width: number;
  height: number;
  href: string;
  label: string;
};

export const Thumbnail = memo(
  ({ frames, width, height, href, label }: ThumbnailProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    const getContext = () => {
      if (contextRef.current) {
        return contextRef.current;
      }

      contextRef.current = canvasRef.current?.getContext("2d") ?? null;
      return contextRef.current;
    };

    const drawImage = (imgData: string) => {
      const context = getContext();

      if (context) {
        const img = new Image();
        img.src = `data:image/jpeg;base64,${imgData}`;
        index.current += 1;
        img.onload = () => {
          context.clearRect(0, 0, width, height);
          context.drawImage(img, 0, 0);
        };
      }
    };

    useEffect(() => {
      if (frames.length > 0) {
        drawImage(frames[0]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frames]);

    const index = useRef(0);
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const render = useCallback(() => {
      if (frames.length > 0) {
        timeout.current = setTimeout(() => {
          drawImage(frames[index.current % frames.length]);
          render();
        }, 100);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frames]);

    const onMouseEnter = useCallback(() => {
      render();
    }, [render]);

    const onMouseLeave = useCallback(() => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }, []);

    return (
      <Link
        {...{
          href,
          className: "relative",
          onMouseEnter,
          onMouseLeave,
        }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full"
        />
        <span className="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center font-heading key">
          {label}
        </span>
      </Link>
    );
  }
);

Thumbnail.displayName = "Thumbnail";
