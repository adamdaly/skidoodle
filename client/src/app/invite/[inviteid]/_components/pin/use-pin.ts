import { ClipboardEvent, useCallback, useEffect, useMemo, useRef } from "react";
import { FieldPath, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useInvite } from "../context";

const createPinSchema = () =>
  z.object({
    a: z.string().min(1).max(1),
    b: z.string().min(1).max(1),
    c: z.string().min(1).max(1),
    d: z.string().min(1).max(1),
    e: z.string().min(1).max(1),
    f: z.string().min(1).max(1),
  });

type PinSchema = z.infer<ReturnType<typeof createPinSchema>>;

export const usePin = () => {
  const { onConfirmPin } = useInvite();
  const schema = useRef(createPinSchema());

  const form = useForm<PinSchema>({
    resolver: zodResolver(schema.current),
    defaultValues: {
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
    },
  });

  const keys = useRef(Object.keys(form.getValues()) as FieldPath<PinSchema>[]);

  useEffect(() => {
    const subscription = form.watch((values, event) => {
      if (event.name && event.type === "change") {
        const index = keys.current.indexOf(event.name);
        const nextName = index > -1 ? keys.current[index + 1] : undefined;
        if (nextName) {
          form.setFocus(nextName);
        }
      }
    });
    return subscription.unsubscribe;
  }, [form]);

  const onPaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const trimmedText = pastedText.trim();

      trimmedText.split("").forEach((char, index) => {
        console.log(char, /^\d$/.test(char));
        if (/^\d$/.test(char)) {
          form.setValue(keys.current[index], char);
        }
      });

      form.setFocus(keys.current.at(-1)!);
    },
    [form]
  );

  const submitHandler = useCallback(async ({ a, b, c, d, e, f }: PinSchema) => {
    try {
      await onConfirmPin(a + b + c + d + e + f);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const submit = useMemo(
    () => form.handleSubmit(submitHandler),
    [form, submitHandler]
  );

  return {
    form,
    submit,
    onPaste,
  };
};
