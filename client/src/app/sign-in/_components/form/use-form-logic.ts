import { useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { postSignIn } from "@/custom/api/auth.api";
import {
  createSignInSchema,
  SignInSchema,
} from "../../_utils/create-sign-up-schema";
import { signIn } from "next-auth/react";

export const useSignInFormLogic = () => {
  const schema = useRef(createSignInSchema());
  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(schema.current),
    defaultValues: {
      username: "adam.daly@unosquare.com",
      password: "asdfASDF1234!",
    } satisfies SignInSchema,
  });

  const submit = useCallback(
    async (values: SignInSchema) => {
      try {
        const response = await signIn("credentials", {
          username: values.username,
          password: values.password,
          callbackUrl: "http://localhost:3004/dashboard",
          redirect: false,
        });

        console.log(response);
      } catch (e) {
        console.log(e);
      }
      // try {
      //   await postSignIn({
      //     username: values.username,
      //     password: values.password,
      //   });
      //   router.push("/dashboard");
      // } catch (e) {
      //   if (isAxiosError(e)) {
      //     form.setError("root", {
      //       message: e.message,
      //     });
      //   } else {
      //     form.setError("root", {
      //       message: "Unknown error",
      //     });
      //   }
      // }
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
