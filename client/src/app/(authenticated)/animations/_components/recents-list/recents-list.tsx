import { Animation, Scene } from "@/custom/types";

export type RecentsListProps = { recents: (Animation | Scene)[] };
export const RecentsList = ({ recents }: RecentsListProps) => {
  return (
    <ul>
      {recents.map((recent) => (
        <div key={recent.id}>{recent.name}</div>
      ))}
    </ul>
  );
};
