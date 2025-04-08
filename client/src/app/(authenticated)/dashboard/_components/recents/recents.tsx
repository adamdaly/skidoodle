import { Animation, Scene } from "@/custom/types";
import DateTimeService from "@/custom/services/datetime.service";

type RecentMetadata = {
  metadata: {
    type: "Animation" | "Scene";
  };
};

type RecentAnimation = Animation & RecentMetadata;
type RecentScene = Scene & RecentMetadata;

export type RecentsProps = { recents: (RecentAnimation | RecentScene)[] };

export const Recents = ({ recents }: RecentsProps) => {
  return (
    <ul>
      {recents.map((recent) => (
        <Recent key={`${recent.metadata.type}-${recent.id}`} {...recent} />
      ))}
    </ul>
  );
};

export const Recent = (recent: RecentAnimation | RecentScene) => {
  return (
    <li key={`${recent.metadata.type}-${recent.id}`} className="flex mb-4">
      <img
        src={`http://localhost:3003/frames/bbb1.png`}
        className="block mr-4 w-20"
        alt="bbb1"
      />
      <div>
        <div className="font-heading text-md">{recent.name}</div>
        <div className="text-xs italic text-gray-400">
          {DateTimeService.format_DateTimeFull(recent.updatedAt)}
        </div>
      </div>
    </li>
  );
};
