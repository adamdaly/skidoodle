import { Animation as AnimationType } from "@/custom/types";
import { Animation } from "./components/animation";

export type AnimationsProps = {
  animations: AnimationType[];
};

export const Animations = ({ animations }: AnimationsProps) => {
  return animations.length > 0 ? (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {animations?.map((animation) => (
        <Animation key={animation.id} {...animation} />
      ))}
    </ul>
  ) : (
    <p>
      You haven&apos;t created any Skidoodles yet so click on Create Animation
      to get Skidoodling
    </p>
  );
};
