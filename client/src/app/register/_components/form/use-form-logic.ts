"use client";

import { useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { postRegister } from "@/custom/api/auth.api";
import {
  createRegisterSchema,
  RegisterSchema,
} from "../../_utils/create-register-schema";

export const useRegisterFormLogic = () => {
  const schema = useRef(createRegisterSchema());
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(schema.current),
    defaultValues: {
      username: "",
      password: "",
    } satisfies RegisterSchema,
  });

  const submit = useCallback(
    async (values: RegisterSchema) => {
      try {
        await postRegister(values);
        router.push("/sign-in");
      } catch (e) {
        if (isAxiosError(e)) {
          form.setError("root", {
            message: e.response?.data?.message,
          });
        } else {
          form.setError("root", {
            message: "Unknown error",
          });
        }
      }
    },
    [form, router]
  );

  const onSubmit = useMemo(
    () => form.handleSubmit(submit, (errors) => console.log(errors)),
    [form, submit]
  );

  return {
    form,
    onSubmit,
  } as const;
};
