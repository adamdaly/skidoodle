import { Animation, Scene } from "@/custom/types";
import DateTimeService from "@/custom/services/datetime.service";
import Link from "next/link";

type RecentAnimation = Animation & {
  metadata: {
    type: "Animation";
  };
};
type RecentScene = Scene & {
  metadata: {
    type: "Scene";
  };
};

export type RecentsProps = { recents: (RecentAnimation | RecentScene)[] };

export const Recents = ({ recents }: RecentsProps) => {
  return (
    <ul data-testid="list-recents">
      {recents.map((recent) => (
        <Recent key={`${recent.metadata.type}-${recent.id}`} {...recent} />
      ))}
    </ul>
  );
};

export const Recent = (recent: RecentAnimation | RecentScene) => {
  return (
    <li key={`${recent.metadata.type}-${recent.id}`}>
      <Link
        {...{
          className: "flex mb-4",
          href: `/${
            recent.metadata.type === "Animation" ? "animations" : "scenes"
          }/${recent.id}`,
        }}
      >
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
      </Link>
    </li>
  );
};
