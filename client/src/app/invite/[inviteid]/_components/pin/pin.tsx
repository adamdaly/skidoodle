"use client";
import { memo } from "react";
import { FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { usePin } from "./use-pin";

export const Pin = memo(() => {
  const { form, submit, onPaste } = usePin();
  const inputClassName =
    "w-8 mx-1 text-center border-1 border-solid text-2xl disabled:text-gray-400";

  const inputProps = {
    disabled: form.formState.isSubmitting,
    className: inputClassName,
    maxLength: 1,
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <FormProvider {...form}>
        <form onSubmit={submit}>
          <div className="mb-4">
            <p className="mb-4 text-center">Enter Pin</p>
            <div className="flex justify-center items-center">
              <input
                {...form.register("a")}
                {...inputProps}
                onPaste={onPaste}
              />
              <input {...form.register("b")} {...inputProps} />
              <input {...form.register("c")} {...inputProps} />
              <span>-</span>
              <input {...form.register("d")} {...inputProps} />
              <input {...form.register("e")} {...inputProps} />
              <input {...form.register("f")} {...inputProps} />
            </div>
          </div>
          <Button
            type="submit"
            data-testid="cta-pin-submit"
            className="block m-auto"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
});

Pin.displayName = "Pin";
