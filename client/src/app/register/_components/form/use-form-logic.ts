"use client";

import { useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { authServiceClient } from "@/custom/services/auth/client";
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
        await authServiceClient.signUp({
          username: values.username,
          password: values.password,
        });

        router.push("/confirm-registration");
      } catch (e) {
        console.log(e);
      }
    },
    [router]
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
