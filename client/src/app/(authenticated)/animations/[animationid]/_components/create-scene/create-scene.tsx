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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFTextField } from "@/custom/components/inputs/textfields/rhf-textfield";
import { postScene } from "@/api/animation-api";
import { useParams } from "next/navigation";

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

export function CreateScene() {
  const {} = useParams();
  const [open, setOpen] = useState(false);

  const schema = useRef(createCreateSceneSchema());
  const form = useForm<CreateSceneSchema>({
    resolver: zodResolver(schema.current),
    defaultValues: {
      name: "asdf",
      index: 1,
    },
  });

  const close = () => {
    setOpen(false);
    form.reset();
  };

  const submit = useCallback(async (data: CreateSceneSchema) => {
    console.log(data);

    try {
      const response = await postScene({
        animationid: 15,
        name: data.name,
        index: data.index,
      });
      console.log(response);

      setOpen(false);
      form.reset();
    } catch (e) {
      console.log(e);
    }
  }, []);

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
              <DialogTitle>Add Dimensions</DialogTitle>
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
