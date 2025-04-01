// import { HTMLProps } from 'react';
// import Typography, { TypographyProps } from '@mui/material/Typography';
// import {
//   useHRStyles,
//   useLargeStyles,
//   useSmallStyles,
//   useCaptionStyles,
//   useLabelStyles,
//   useTitleStyles,
//   useBoldStyles,
// } from './use-typography-styles';

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

// export const H2 = (props: TypographyProps) => <Typography {...props} variant='h2' />;
// export const H3 = (props: TypographyProps) => <Typography {...props} variant='h3' />;
// export const H4 = (props: TypographyProps) => <Typography {...props} variant='h4' />;
// export const H5 = (props: TypographyProps) => <Typography {...props} variant='h5' />;
// export const H6 = (props: TypographyProps) => <Typography {...props} variant='h6' />;
// export const P = (props: TypographyProps) => <Typography {...props} variant='body1' />;

// export const Small = ({ children, className, ...props }: HTMLProps<HTMLSpanElement>) => {
//   const { classes, cx } = useSmallStyles();
//   const rootClass = cx(classes.root, className);
//   return (
//     <span className={rootClass} {...props}>
//       {children}
//     </span>
//   );
// };

// export const Large = ({ children, className, ...props }: HTMLProps<HTMLSpanElement>) => {
//   const { classes, cx } = useLargeStyles();
//   const rootClass = cx(classes.root, className);
//   return (
//     <span className={rootClass} {...props}>
//       {children}
//     </span>
//   );
// };

// export const Caption = ({ children, className, ...props }: HTMLProps<HTMLSpanElement>) => {
//   const { classes, cx } = useCaptionStyles();
//   const rootClass = cx(classes.root, className);
//   return (
//     <span className={rootClass} {...props}>
//       {children}
//     </span>
//   );
// };

// export const Label = ({ children, className, ...props }: HTMLProps<HTMLSpanElement>) => {
//   const { classes, cx } = useLabelStyles();
//   const rootClass = cx(classes.root, className);
//   return (
//     <span className={rootClass} {...props}>
//       {children}
//     </span>
//   );
// };

// export const Title = ({ children, className, ...props }: HTMLProps<HTMLSpanElement>) => {
//   const { classes, cx } = useTitleStyles();
//   const rootClass = cx(classes.root, className);
//   return (
//     <span className={rootClass} {...props}>
//       {children}
//     </span>
//   );
// };

// export const HorizontalRule = ({
//   children,
//   className,
//   spacerClassName,
//   ...props
// }: HTMLProps<HTMLSpanElement> & { spacerClassName?: string }) => {
//   const { classes, cx } = useHRStyles();

//   const rootClass = cx(classes.root, className);
//   const spacerClass = cx(classes.spacer, spacerClassName);

//   return (
//     <span className={rootClass} {...props}>
//       <span className={spacerClass} />
//       {children && <span className={classes.content}>{children}</span>}
//       <span className={spacerClass} />
//     </span>
//   );
// };

// export const Bold = ({ children, className, ...props }: HTMLProps<HTMLSpanElement>) => {
//   const { classes, cx } = useBoldStyles();
//   const rootClass = cx(classes.root, className);
//   return (
//     <span className={rootClass} {...props}>
//       {children}
//     </span>
//   );
// };
