import Link from "next/link";
import { Animation } from "@/custom/types";

export type AnimationListProps = {
  animations: Animation[];
};

export const AnimationList = ({ animations }: AnimationListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {animations?.map((animation) => (
        <li key={animation.id}>
          <Link
            href={`/animations/${animation.id}`}
            className="flex flex-col rounded-lg border bg-card p-4 shadow transition-all hover:shadow-md"
          >
            {animation.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
