"use client";
import { Animation as AnimationType } from "@/custom/types";
import { Animation } from "./components/animation";
import { CreateAnimation } from "../create-animation";
import { useCallback, useState } from "react";

export type AnimationsProps = {
  animations: AnimationType[];
};

export const Animations = (props: AnimationsProps) => {
  const [animations, setAnimations] = useState(props.animations);

  const onCreateAnimation = useCallback(
    (animation: AnimationType) => {
      setAnimations([...animations, animation]);
    },
    [animations]
  );

  return animations.length > 0 ? (
    <>
      <ul className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {animations?.map((animation) => (
          <Animation key={animation.id} {...animation} />
        ))}
      </ul>

      <CreateAnimation {...{ onCreateAnimation }} />
    </>
  ) : (
    <p>
      You haven&apos;t created any Skidoodles yet so click on Create Animation
      to get Skidoodling
    </p>
  );
};
