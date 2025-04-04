"use client";

import { useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
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
import { postRegister } from "@/custom/requests/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { isAxiosError } from "axios";

const createRegisterSchema = () =>
  z.object({
    username: z.string().email().trim(),
    password: z.string().min(1),
  });

type RegisterSchema = z.infer<ReturnType<typeof createRegisterSchema>>;

export const RegisterForm = () => {
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
        await postRegister(values);
        router.push("/sign-in");
      } catch (e) {
        if (isAxiosError(e)) {
          form.setError("root", {
            message: e.response?.data?.message,
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
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
