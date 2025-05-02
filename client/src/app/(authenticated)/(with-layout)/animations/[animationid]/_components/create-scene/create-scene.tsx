"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Scene } from "@/custom/types";
import { RHFTextField } from "@/custom/components/inputs/text-field";
import { useAnimation } from "../context";
import { postScene } from "@/custom/api/animation.api";

const createCreateSceneSchema = (maxIndex: number) =>
  z.object({
    name: z.string().min(1),
    index: z.coerce.number().min(1).max(maxIndex),
  });

type CreateSceneSchema = z.infer<ReturnType<typeof createCreateSceneSchema>>;

export type CreateSceneProps = {
  onCreate(scene: Scene): void;
  scenes: Scene[];
};

export function CreateScene() {
  const params = useParams();
  const { scenes, onCreateScene } = useAnimation();
  const [open, setOpen] = useState(false);

  const maxIndex = scenes.length + 1;

  const schema = useRef(createCreateSceneSchema(maxIndex));
  const form = useForm<CreateSceneSchema>({
    resolver: zodResolver(schema.current),
    defaultValues: {
      name: "",
      index: maxIndex,
    },
  });

  const close = () => {
    setOpen(false);
    form.reset();
  };

  const submit = useCallback(
    async (data: CreateSceneSchema) => {
      try {
        const response = await postScene({
          animationid: parseInt(params.animationid as string, 10),
          name: data.name,
          index: data.index - 1,
        });

        onCreateScene(response.data);
        setOpen(false);
        form.reset();
      } catch (e) {
        console.log(e);
      }
    },
    [form, params.animationid, onCreateScene]
  );

  const onSubmit = useMemo(() => form.handleSubmit(submit), [form, submit]);

  return (
    <FormProvider {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button data-testid="cta-scene-create" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" />
            <span>Add Scene</span>
          </Button>
        </DialogTrigger>
        <DialogContent
          data-testid="dialog-scene-create"
          className="sm:max-w-[425px]"
        >
          <form {...{ onSubmit }}>
            <DialogHeader className="mb-4">
              <DialogTitle>Add Scene</DialogTitle>
              <DialogDescription>
                Enter a name and dimensions for your item.
              </DialogDescription>
            </DialogHeader>
            <div>
              <div className="mb-4">
                <RHFTextField<CreateSceneSchema>
                  {...{
                    control: form.control,
                    name: "name",
                    label: "Name",
                    "data-testid": "input-scene-create-name",
                  }}
                />
              </div>
              <div className="mb-4">
                <RHFTextField<CreateSceneSchema>
                  {...{
                    control: form.control,
                    name: "index",
                    label: "Index",
                    "data-testid": "input-scene-create-index",
                    InputProps: {
                      type: "number",
                      min: 1,
                      max: maxIndex,
                    },
                    description:
                      "Where in the order of scenes should this appear",
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                data-testid="cta-scene-create-cancel"
                type="button"
                variant="outline"
                onClick={close}
              >
                Cancel
              </Button>
              <Button data-testid="cta-scene-create-submit" type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
