"use client";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";

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

import { SignInSchema } from "../../_utils/create-sign-up-schema";
import { useSignInFormLogic } from "./use-form-logic";

export const SignInForm = () => {
  const { form, onSubmit } = useSignInFormLogic();

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
                    "data-testid": "input-username",
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
                    "data-testid": "input-password",
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
              <Alert
                data-testid="alert-signin"
                variant="destructive"
                className="mb-4 w-full"
              >
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
                  "data-testid": "cta-submit",
                }}
              >
                Submit
              </Button>
            </div>
            <p className="text-sm">
              Don&apos;t have an account? Register&nbsp;
              <Link
                href="/register"
                className="font-heading text-purple-900 hover:underline"
              >
                here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
