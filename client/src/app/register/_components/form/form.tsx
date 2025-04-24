"use client";

import { AlertCircleIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { RHFTextField } from "@/custom/components/inputs/text-field";
import { Grid } from "@/custom/components/grid";
import { H1 } from "@/custom/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RegisterSchema } from "../../_utils/create-register-schema";
import { useRegisterFormLogic } from "./use-form-logic";

export const RegisterForm = () => {
  const { form, onSubmit } = useRegisterFormLogic();
  return (
    <Form<RegisterSchema> {...form}>
      <form {...{ onSubmit }}>
        <Card>
          <CardHeader>
            <CardTitle>
              <H1 className="text-4xl">Register</H1>
            </CardTitle>
            <CardDescription>
              Register for you Skidoodle account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Grid container>
              <Grid size={12}>
                <RHFTextField<RegisterSchema>
                  {...{
                    control: form.control,
                    name: "username",
                    "data-testid": "input-register-username",
                    label: "Email",
                    description: "This will be your username.",
                    InputProps: {
                      disabled: form.formState.isSubmitting,
                    },
                  }}
                />
              </Grid>
              <Grid size={12}>
                <RHFTextField<RegisterSchema>
                  {...{
                    control: form.control,
                    name: "password",
                    "data-testid": "input-register-password",
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
            <Button data-testid="cta-register-submit" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
