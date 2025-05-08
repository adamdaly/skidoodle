import { useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  createSignInSchema,
  SignInSchema,
} from "../../_utils/create-sign-up-schema";
import { signIn } from "aws-amplify/auth";

export const useSignInFormLogic = () => {
  const schema = useRef(createSignInSchema());
  const router = useRouter();

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
        const response = await signIn({
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
