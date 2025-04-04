"use client";

import { useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { RHFTextField } from "@/custom/components/inputs/text-field";
import { Grid } from "@/custom/components/grid";
import { H1 } from "@/custom/components/typography";
import { postSignIn } from "@/custom/requests/auth";
import {
  createSignInSchema,
  SignInSchema,
} from "../../_utils/create-sign-up-schema";
import Link from "next/link";

export const SignInForm = () => {
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
        await postSignIn({
          username: values.username,
          password: values.password,
        });
        router.push("/dashboard");
      } catch (e) {
        if (isAxiosError(e)) {
          form.setError("root", {
            message: e.message,
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

  return (
    <Form {...form}>
      <form {...{ onSubmit }}>
        <Card>
          <CardHeader>
            <CardTitle>
              <H1 className="text-4xl">Sign In</H1>
            </CardTitle>
            <CardDescription>Sign in to start Skidoodling</CardDescription>
          </CardHeader>
          <CardContent>
            <Grid container>
              <Grid size={12}>
                <RHFTextField<SignInSchema>
                  {...{
                    control: form.control,
                    name: "username",
                    label: "Email",
                    InputProps: {
                      disabled: form.formState.isSubmitting,
                    },
                  }}
                />
              </Grid>
              <Grid size={12}>
                <RHFTextField<SignInSchema>
                  {...{
                    control: form.control,
                    name: "password",
                    label: "Password",
                    InputProps: {
                      type: "password",
                      disabled: form.formState.isSubmitting,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardFooter className="flex flex-col">
            {form.formState.errors.root && (
              <Alert variant="destructive" className="mb-4 w-full">
                <AlertCircleIcon />
                <AlertTitle>Sign in failed</AlertTitle>
                <AlertDescription>
                  {form.formState.errors.root?.message}
                </AlertDescription>
              </Alert>
            )}
            <div className="mb-4">
              <Button
                {...{
                  type: "submit",
                  disabled: form.formState.isSubmitting,
                }}
              >
                Submit
              </Button>
            </div>
            <p className="text-sm">
              Don&apos;t have an account, register&nbsp;
              <Link
                href="/register"
                className="text-purple-900 hover:underline"
              >
                here.
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
