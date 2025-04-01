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
import { useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { RHFTextField } from "@/custom/components/inputs/textfields/rhf-textfield";
import { Grid } from "@/custom/components/grid";
import { useRouter } from "next/navigation";
import { postRegister } from "@/api/auth-api";
import { H1 } from "@/custom/components/typography";

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

  const submit = async (values: RegisterSchema) => {
    try {
      await postRegister(values, { withCredentials: false });
      router.push("/sign-in");
    } catch {}
  };

  const onSubmit = useMemo(
    () => form.handleSubmit(submit, (errors) => console.log(errors)),
    [form]
  );

  return (
    <Form {...form}>
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
                  }}
                />
              </Grid>
              <Grid size={12}>
                <RHFTextField<RegisterSchema>
                  {...{
                    control: form.control,
                    name: "password",
                    label: "Password",
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
