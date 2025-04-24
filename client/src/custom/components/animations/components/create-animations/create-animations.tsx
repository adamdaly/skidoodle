"use client";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Grid } from "@/custom/components/grid";
import { RHFTextField } from "@/custom/components/inputs/text-field";
import { postAnimation } from "@/custom/api/animation.api";
import { Animation } from "@/custom/types";

const createCreateAnimationSchema = () =>
  z.object({
    name: z.string().min(1),
    width: z.coerce.number().min(1).max(1920),
    height: z.coerce.number().min(1).max(1080),
    framerate: z.coerce.number().min(1).max(120),
  });

type CreateAnimationSchema = z.infer<
  ReturnType<typeof createCreateAnimationSchema>
>;

export type UseCreateAnimationArgs = {
  onCreateAnimation(animation: Animation): void;
};

export const useCreateAnimationLogic = ({
  onCreateAnimation,
}: UseCreateAnimationArgs) => {
  const [open, setOpen] = useState(false);
  const schema = useMemo(() => createCreateAnimationSchema(), []);
  const defaultValues = useRef<CreateAnimationSchema>({
    name: "",
    width: 1920,
    height: 1080,
    framerate: 24,
  });

  const form = useForm<CreateAnimationSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues.current,
  });

  const submit = useCallback(async (data: CreateAnimationSchema) => {
    try {
      const response = await postAnimation(data);
      onCreateAnimation(response.data);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onSubmit = useMemo(() => form.handleSubmit(submit), [form, submit]);

  return {
    open,
    setOpen,
    form,
    onSubmit,
  } as const;
};

export type CreateAnimationProps = {
  onCreateAnimation(animation: Animation): void;
};

export const CreateAnimation = memo(
  ({ onCreateAnimation }: CreateAnimationProps) => {
    const { open, setOpen, form, onSubmit } = useCreateAnimationLogic({
      onCreateAnimation,
    });
    return (
      <FormProvider {...form}>
        <Dialog
          {...{
            open,
            onOpenChange: setOpen,
          }}
        >
          <DialogTrigger asChild>
            <Button data-testid="cta-animation-create">Create Animation</Button>
          </DialogTrigger>
          <DialogContent data-testid="dialog-animation-create">
            <DialogHeader>
              <DialogTitle>
                <span data-testid="title-animation-create">
                  Create Animation
                </span>
              </DialogTitle>
              <DialogDescription>
                Width and Height cannot be changed once the animation has been
                created
              </DialogDescription>
            </DialogHeader>
            <form {...{ onSubmit }}>
              <Grid container>
                <Grid>
                  <RHFTextField<CreateAnimationSchema>
                    {...{
                      control: form.control,
                      name: "name",
                      label: "Name",
                      message: form.formState.errors.name?.message,
                      "data-testid": "input-animation-create-name",
                    }}
                  />
                </Grid>
                <Grid size={6}>
                  <RHFTextField<CreateAnimationSchema>
                    {...{
                      control: form.control,
                      type: "number",
                      name: "width",
                      label: "Width",
                      message: form.formState.errors.width?.message,
                      "data-testid": "input-animation-create-width",
                    }}
                  />
                </Grid>
                <Grid size={6}>
                  <RHFTextField<CreateAnimationSchema>
                    {...{
                      control: form.control,
                      type: "number",
                      name: "height",
                      label: "Height",
                      message: form.formState.errors.height?.message,
                      "data-testid": "input-animation-create-height",
                    }}
                  />
                </Grid>
                <Grid>
                  <RHFTextField<CreateAnimationSchema>
                    {...{
                      control: form.control,
                      name: "framerate",
                      label: "Frame Rate",
                      message: form.formState.errors.framerate?.message,
                      "data-testid": "input-animation-create-framerate",
                    }}
                  />
                </Grid>
                <Grid>
                  <div className="flex justify-end gap-4">
                    <Button
                      {...{
                        onClick: () => setOpen(false),
                        variant: "ghost",
                        "data-testid": "cta-animation-create-cancel",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      {...{
                        type: "submit",
                        "data-testid": "cta-animation-create-submit",
                      }}
                    >
                      Create
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </FormProvider>
    );
  }
);

CreateAnimation.displayName = "CreateAnimation";
