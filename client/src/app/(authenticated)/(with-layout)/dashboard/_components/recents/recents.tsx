"use client";

import { useMemo } from "react";
import Link from "next/link";
import { GetRecentsResponse } from "@/custom/api/animation.api/server";
import { SERVER_URL } from "@/custom/constants";
import DateTimeService from "@/custom/services/datetime.service";
import { Animation, Scene } from "@/custom/types";

export type RecentsProps = { recents: GetRecentsResponse };
export const Recents = ({ recents }: RecentsProps) => {
  return (
    <ul data-testid="list-recents">
      {recents.map((recent) => (
        <Recent key={`${recent.metadata.type}-${recent.id}`} {...recent} />
      ))}
    </ul>
  );
};

export const Recent = (recent: GetRecentsResponse[number]) => {
  const filename = useMemo(
    () =>
      recent.metadata.type === "Animation"
        ? (recent as Animation).Scene[0]?.Frame[0]?.filename
        : (recent as Scene).Frame[0]?.filename,
    [recent]
  );
  return (
    <li>
      <Link
        {...{
          className: "flex mb-4",
          href: `/${
            recent.metadata.type === "Animation" ? "animations" : "scenes"
          }/${recent.id}`,
        }}
      >
        <img
          src={`${SERVER_URL}/files/${filename}`}
          className="block mr-4 w-20"
          alt={`${recent.name}`}
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
