import { MouseEvent, useCallback, useRef } from "react";

export enum MouseButton {
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2,
}

export type MouseLocationState = {
  offsetX: number;
  offsetY: number;
  relativeOffsetX: number;
  relativeOffsetY: number;
  deltaX: number;
  deltaY: number;
};

export type UseMouseLocationArgs<E> = {
  trigger?: MouseButton;
  mouseDown?(e: MouseEvent<E>, state: MouseLocationState): void;
  mouseMove?(e: MouseEvent<E>, state: MouseLocationState): void;
  mouseUp?(e: MouseEvent<E>, state: MouseLocationState): void;
};

export const useMouseLocation = <E extends HTMLElement>(
  {
    trigger = MouseButton.LEFT,
    mouseDown,
    mouseMove,
    mouseUp,
  }: UseMouseLocationArgs<E> = {
    trigger: MouseButton.LEFT,
  }
) => {
  const isMouseDown = useRef(false);
  const initialX = useRef(0);
  const currentX = useRef(0);
  const offsetX = useRef(0);
  const relativeOffsetX = useRef(0);
  const initialY = useRef(0);
  const currentY = useRef(0);
  const offsetY = useRef(0);
  const relativeOffsetY = useRef(0);

  const data = useRef<DOMRect | undefined>(undefined);

  const onMouseDown = useCallback(
    (e: MouseEvent<E>) => {
      if (e.button === trigger) {
        data.current = e.currentTarget.getBoundingClientRect();
        e.preventDefault();
        isMouseDown.current = true;
        initialX.current = e.pageX;
        initialY.current = e.pageY;

        relativeOffsetX.current = e.pageX - data.current.left;
        relativeOffsetY.current = e.pageY - data.current.top;
        mouseDown?.(e, {
          deltaX: 0,
          deltaY: 0,
          offsetX: 0,
          offsetY: 0,
          relativeOffsetX: relativeOffsetX.current,
          relativeOffsetY: relativeOffsetY.current,
        });
      }
    },
    [trigger, mouseDown]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent<E>) => {
      if (isMouseDown.current) {
        currentX.current = e.pageX;
        const deltaX = currentX.current - initialX.current;
        initialX.current = currentX.current;

        currentY.current = e.pageY;
        const deltaY = currentY.current - initialY.current;
        initialY.current = currentY.current;

        offsetX.current = offsetX.current - deltaX;
        offsetY.current = offsetY.current - deltaY;

        relativeOffsetX.current = e.pageX - (data.current?.left ?? 0);
        relativeOffsetY.current = e.pageY - (data.current?.top ?? 0);

        mouseMove?.(e, {
          deltaX,
          deltaY,
          offsetX: offsetX.current,
          offsetY: offsetY.current,
          relativeOffsetX: relativeOffsetX.current,
          relativeOffsetY: relativeOffsetY.current,
        });
      }
    },
    [mouseMove]
  );

  const onMouseUp = useCallback(
    (e: MouseEvent<E>) => {
      offsetX.current = 0;
      offsetY.current = 0;
      isMouseDown.current = false;
      mouseUp?.(e, {
        offsetX: 0,
        offsetY: 0,
        deltaX: 0,
        deltaY: 0,
        relativeOffsetX: 0,
        relativeOffsetY: 0,
      });
    },
    [mouseUp]
  );

  const onMouseLeave = useCallback(() => {
    isMouseDown.current = false;
  }, []);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  } as const;
};
