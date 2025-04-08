import { Animation as AnimationType } from "@/custom/types";
import { Animation } from "./animation";

export type AnimationsProps = {
  animations: AnimationType[];
};

export const Animations = ({ animations }: AnimationsProps) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {animations?.map((animation) => (
        <Animation key={animation.id} {...animation} />
      ))}
    </ul>
  );
};
