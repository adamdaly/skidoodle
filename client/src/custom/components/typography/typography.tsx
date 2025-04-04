import { HTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type HeadingProps = HTMLProps<HTMLHeadingElement> & {
  children: ReactNode;
};
export const H1 = ({ children, className, ...props }: HeadingProps) => (
  <h1 className={twMerge("font-heading text-5xl", className)} {...props}>
    {children}
  </h1>
);

export const H2 = ({ children, className, ...props }: HeadingProps) => (
  <h2 className={twMerge("font-heading text-4xl", className)} {...props}>
    {children}
  </h2>
);

export const H3 = ({ children, className, ...props }: HeadingProps) => (
  <h3 className={twMerge("font-heading text-3xl", className)} {...props}>
    {children}
  </h3>
);

export const H4 = ({ children, className, ...props }: HeadingProps) => (
  <h4 className={twMerge("font-heading text-sm", className)} {...props}>
    {children}
  </h4>
);

export const H5 = ({ children, className, ...props }: HeadingProps) => (
  <h5 className={twMerge("font-heading text-sm", className)} {...props}>
    {children}
  </h5>
);

export const H6 = ({ children, className, ...props }: HeadingProps) => (
  <h6 className={twMerge("font-heading text-sm", className)} {...props}>
    {children}
  </h6>
);
