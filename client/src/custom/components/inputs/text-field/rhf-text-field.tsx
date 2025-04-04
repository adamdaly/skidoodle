import { FormField } from "@/components/ui/form";
import { InputHTMLAttributes, memo, useMemo } from "react";
import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
  UseFormStateReturn,
} from "react-hook-form";
import { TextField } from "./text-field";

export type RHFTextFieldProps<T extends FieldValues> = {
  label: string;
  description?: string;
  control: Control<T>;
  name: Path<T>;

  InputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "onBlur"
  >;
};

const RHFTextFieldBase = <T extends FieldValues>({
  label,
  description,
  control,
  name,
  InputProps,
}: RHFTextFieldProps<T>) => {
  type RenderProps = {
    field: ControllerRenderProps<T, FieldPath<T>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  };

  const render = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      ({ field }: RenderProps) => {
        return (
          <TextField
            {...{ label, description, InputProps: { ...InputProps, ...field } }}
          />
        );
      },
    [description, label, InputProps]
  );

  return (
    <FormField<T>
      {...{
        control,
        name,
        render,
      }}
    />
  );
};

RHFTextFieldBase.displayName = "RHFTextField";

export const RHFTextField = memo(RHFTextFieldBase) as typeof RHFTextFieldBase;
