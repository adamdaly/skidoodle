"use client";
import { useCallback, useState } from "react";
import { Animation as AnimationType } from "@/custom/types";
import { Animation } from "./components/animation";
import { CreateAnimation } from "./components/create-animations";
import { useRouter } from "next/navigation";

export type AnimationsProps = {
  animations: AnimationType[];
};

export const Animations = (props: AnimationsProps) => {
  const [animations] = useState(props.animations);
  const router = useRouter();
  const onCreateAnimation = useCallback(
    (animation: AnimationType) => {
      router.push(`/animations/${animation.id}`);
    },
    [router]
  );
  return (
    <>
      {animations.length > 0 && (
        <ul
          data-testid="list-animations"
          className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {animations?.map((animation) => (
            <Animation key={animation.id} {...animation} />
          ))}
        </ul>
      )}
      {animations.length === 0 && (
        <p data-testid="txt-list-animation-none" className="mb-6">
          You haven&apos;t created any Skidoodles yet so click on Create
          Animation to get Skidoodling
        </p>
      )}
      <CreateAnimation {...{ onCreateAnimation }} />
    </>
  );
};
