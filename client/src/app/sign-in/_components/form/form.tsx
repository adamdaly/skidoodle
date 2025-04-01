"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { RHFTextField } from "@/custom/components/inputs/textfields/rhf-textfield";
import { Grid } from "@/custom/components/grid";
import { useRouter } from "next/navigation";
import { H1 } from "@/custom/components/typography";
import {
  createSignInSchema,
  SignInSchema,
} from "../../_utils/create-sign-up-schema";
import { postSignIn } from "@/api/auth-api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { isAxiosError } from "axios";

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
        router.push("/animations");
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
            <div>
              <Button
                {...{
                  type: "submit",
                  disabled: form.formState.isSubmitting,
                }}
              >
                Submit
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
