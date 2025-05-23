"use client";

import { useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { AuthServiceClient } from "@/custom/services/auth/client";
import {
  createRegisterConfirmSchema,
  RegisterConfirmSchema,
} from "../../_utils/create-register-confirm-schema";

export const useRegisterConfirmFormLogic = () => {
  const schema = useRef(createRegisterConfirmSchema());
  const router = useRouter();

  const authServiceClient = useRef(new AuthServiceClient());

  const form = useForm<RegisterConfirmSchema>({
    resolver: zodResolver(schema.current),
    defaultValues: {
      username: "",
      confirmationCode: "",
    } satisfies RegisterConfirmSchema,
  });

  const submit = useCallback(
    async (values: RegisterConfirmSchema) => {
      try {
        await authServiceClient.current.confirmSignUp({
          username: values.username,
          confirmationCode: values.confirmationCode,
        });

        router.push("/sign-in");
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
