import { ChangeEvent, useCallback } from "react";
import { Shared } from "./use-shared";
import { AvailableTools } from "../types";

export const useTools = ({ setOptions }: Shared) => {
  const onColorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setOptions((currentOptions) => ({
      ...currentOptions,
      color: e.target.value,
    }));
  }, []);

  const onToolChange = useCallback(
    (tool: AvailableTools) => () => {
      setOptions((currentOptions) => ({
        ...currentOptions,
        tool,
      }));
    },
    []
  );

  const onBrushSizeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const brushSize = parseInt(e.target.value, 10);

    if (Number.isNaN(brushSize)) {
      // TODO - Alert
      setOptions((currentOptions) => ({
        ...currentOptions,
      }));
    } else {
      setOptions((currentOptions) => ({
        ...currentOptions,
        brushSize,
      }));
    }
  }, []);

  return {
    onColorChange,
    onToolChange,
    onBrushSizeChange,
  } as const;
};
