"use client";

import {
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { z } from "zod";

import { H3 } from "@/custom/components/typography";
import { useScene } from "../context";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { patchFrame } from "@/custom/api/animation.api/client";
import { Frame } from "@/custom/types";
const createFrameLengthSchema = () =>
  z.object({
    frameLength: z.coerce.number().min(1).max(512),
  });

type FrameLengthSchema = z.infer<ReturnType<typeof createFrameLengthSchema>>;

const useFrameLengthForm = (
  updateFrameLengthOptimistic: (id: number, frameLength: number) => void,
  frame?: Frame
) => {
  const schema = useRef(createFrameLengthSchema());
  const defaultValues = useRef({ frameLength: frame?.length });

  const form = useForm<FrameLengthSchema>({
    resolver: zodResolver(schema.current),
    defaultValues: defaultValues.current,
  });

  const [isLengthActive, setIsLengthActive] = useState(false);

  const onLengthClick = useCallback(() => {
    setIsLengthActive(true);
  }, []);

  useEffect(() => {
    if (frame) {
      form.setValue("frameLength", frame.length);
    }
  }, [form, frame]);

  const reset = useCallback(() => {
    setIsLengthActive(false);
    if (frame) {
      form.setValue("frameLength", frame.length);
    }
  }, [form, frame]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        reset();
      }
    },
    [reset]
  );

  const submit = useCallback(
    async ({ frameLength }: FrameLengthSchema) => {
      if (!frame) {
        return;
      }
      try {
        await patchFrame(frame.id, {
          length: frameLength,
        });

        updateFrameLengthOptimistic(frame.id, frameLength);
      } catch (e) {
        console.log(e);
      }
      setIsLengthActive(false);
    },
    [frame]
  );

  return {
    form,
    submit,
    onLengthClick,
    isLengthActive,
    onKeyDown,
  };
};

export const Info = memo(() => {
  const { animation, scene, frame, updateFrameLengthOptimistic } = useScene();

  const { form, submit, onLengthClick, isLengthActive, onKeyDown } =
    useFrameLengthForm(updateFrameLengthOptimistic, frame);

  const onSubmit = useMemo(() => form.handleSubmit(submit), [form, submit]);

  const ref = useRef<HTMLInputElement | null>(null);

  const dlClass = "grid grid-cols-[auto_1fr] gap-2 mb-4 whitespace-nowrap";
  const dtClass = "font-medium";
  const ddClass = "text-gray-600 overflow-hidden text-ellipsis";

  useLayoutEffect(() => {
    if (isLengthActive) {
      setTimeout(() => {
        ref.current?.select();
      });
    }
  }, [isLengthActive]);
  return (
    <div className="p-4">
      <H3>Animation</H3>
      <dl className={dlClass}>
        <dt className={dtClass}>Name:</dt>
        <dd className={ddClass} title={animation.name}>
          {animation.name}
        </dd>
        <dt className={dtClass}>Width:</dt>
        <dd className={ddClass}>{animation.width}</dd>
        <dt className={dtClass}>Height:</dt>
        <dd className={ddClass}>{animation.height}</dd>
        <dt className={dtClass}>Frame Rate:</dt>
        <dd className={ddClass}>{animation.framerate}</dd>
      </dl>
      <H3>Scene</H3>
      <dl className={dlClass}>
        <dt className={dtClass}>Name:</dt>
        <dd className={ddClass} title={scene.name}>
          {scene.name}
        </dd>
      </dl>
      {frame && (
        <>
          <H3>Frame</H3>
          <dl className={dlClass}>
            <dt className={dtClass}>Index:</dt>
            <dd className={ddClass}>{frame.index + 1}</dd>
            <FormProvider {...form}>
              <dt className={dtClass}>Length:</dt>
              {isLengthActive && (
                <dd className={ddClass}>
                  <form {...{ onSubmit }}>
                    <Controller<FrameLengthSchema>
                      {...{
                        name: "frameLength",
                        control: form.control,
                        render: ({ field }) => (
                          <input
                            {...{
                              ...field,
                              ref,
                              type: "number",
                              onKeyDown,
                              "data-testid": "input-frame-length",
                            }}
                          />
                        ),
                      }}
                    />
                  </form>
                </dd>
              )}
              {!isLengthActive && (
                <dd className={ddClass}>
                  <button className="cursor-pointer" onClick={onLengthClick}>
                    {frame.length}
                  </button>
                </dd>
              )}
            </FormProvider>
          </dl>
        </>
      )}
    </div>
  );
});

Info.displayName = "Info";
