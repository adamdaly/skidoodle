import { ChangeEvent, FocusEvent, InputHTMLAttributes, memo } from "react";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export type TextFieldProps = {
  label: string;
  description?: string;
  InputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "onBlur"
  > & {
    value: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    onBlur(e: FocusEvent<HTMLInputElement>): void;
  };
  "data-testid": string;
};

export const TextField = memo(
  ({
    label,
    description,
    InputProps,
    "data-testid": dataTestId,
  }: TextFieldProps) => {
    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input data-testid={dataTestId} {...InputProps} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  }
);

TextField.displayName = "TextField";
