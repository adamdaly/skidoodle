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
import { RegisterConfirmSchema } from "../../_utils/create-register-confirm-schema";
import { useRegisterConfirmFormLogic } from "./use-form-logic";

export const RegisterConfirmForm = () => {
  const { form, onSubmit } = useRegisterConfirmFormLogic();
  return (
    <Form<RegisterConfirmSchema> {...form}>
      <form {...{ onSubmit }}>
        <Card>
          <CardHeader>
            <CardTitle>
              <H1 className="text-4xl">Confirm Registration</H1>
            </CardTitle>
            <CardDescription>
              Confirm your Skidoodle account registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Grid container>
              <Grid size={12}>
                <RHFTextField<RegisterConfirmSchema>
                  {...{
                    control: form.control,
                    name: "username",
                    "data-testid": "input-register-confirm-username",
                    label: "Email",
                    description: "The username (email) you used to register.",
                    InputProps: {
                      disabled: form.formState.isSubmitting,
                    },
                  }}
                />
              </Grid>
              <Grid size={12}>
                <RHFTextField<RegisterConfirmSchema>
                  {...{
                    control: form.control,
                    name: "confirmationCode",
                    "data-testid": "input-register-confirm-confirmationCode",
                    label: "Confirmation Code",
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
            <Button data-testid="cta-register-confirm-submit" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
