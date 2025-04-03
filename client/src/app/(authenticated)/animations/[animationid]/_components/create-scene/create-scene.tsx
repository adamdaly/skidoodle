"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

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

import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFTextField } from "@/custom/components/inputs/textfields/rhf-textfield";

import { useParams } from "next/navigation";
import axios from "axios";

import { Scene } from "@/custom/types";

// interface CreateSceneValues {
//   name: string;
//   width: number;
//   height: number;
// }

const createCreateSceneSchema = () =>
  z.object({
    name: z.string().min(1),
    index: z.coerce.number().min(1),
  });

type CreateSceneSchema = z.infer<ReturnType<typeof createCreateSceneSchema>>;

export type CreateSceneProps = {
  onCreate(scene: Scene): void;
};

export function CreateScene({ onCreate }: CreateSceneProps) {
  const params = useParams();

  const [open, setOpen] = useState(false);

  const schema = useRef(createCreateSceneSchema());
  const form = useForm<CreateSceneSchema>({
    resolver: zodResolver(schema.current),
    defaultValues: {
      name: "",
      index: 1,
    },
  });

  const close = () => {
    setOpen(false);
    form.reset();
  };

  const submit = useCallback(
    async (data: CreateSceneSchema) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/scenes",
          {
            animationid: parseInt(params.animationid as string, 10),
            name: data.name,
            index: data.index,
          },
          {
            withCredentials: true,
          }
        );
        onCreate(response.data);
        setOpen(false);
        form.reset();
      } catch (e) {
        console.log(e);
      }
    },
    [form, params.animationid, onCreate]
  );

  const onSubmit = useMemo(() => form.handleSubmit(submit), [form, submit]);

  return (
    <FormProvider {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" />
            <span>Add Scene</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
                  }}
                />
              </div>
              <div className="mb-4">
                <RHFTextField<CreateSceneSchema>
                  {...{
                    control: form.control,
                    name: "index",
                    label: "Index",
                    InputProps: {
                      type: "number",
                    },
                    description:
                      "Where in the order of scenes should this appear",
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
