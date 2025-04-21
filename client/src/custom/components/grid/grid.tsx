import { memo, ReactNode } from "react";

export type GridProps = {
  children: ReactNode;
  container?: boolean;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export const Grid = memo(({ children, container, size = 12 }: GridProps) => {
  if (container) {
    return <div className="w-full mb-4">{children}</div>;
  }

  return <div className={`w-[${(100 / 12) * size}%] mb-4`}>{children}</div>;
});

Grid.displayName = "Grid";
