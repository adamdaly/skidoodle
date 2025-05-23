import { useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { AuthServiceClient } from "@/custom/services/auth/client";
import {
  createSignInSchema,
  SignInSchema,
} from "../../_utils/create-sign-up-schema";

export const useSignInFormLogic = () => {
  const schema = useRef(createSignInSchema());
  const router = useRouter();

  const authServiceClient = useRef(new AuthServiceClient());

  const form = useForm<SignInSchema>({
    resolver: zodResolver(schema.current),
    defaultValues: {
      username: "",
      password: "",
    } satisfies SignInSchema,
  });

  const submit = useCallback(
    async (values: SignInSchema) => {
      try {
        const response = await authServiceClient.current.signIn({
          username: values.username,
          password: values.password,
        });

        if (response.isSignedIn) {
          router.push("/dashboard");
        }
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
