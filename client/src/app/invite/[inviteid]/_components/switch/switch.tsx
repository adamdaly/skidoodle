"use client";

import { memo, Suspense } from "react";
import { useInvite } from "../context";
import { Pin } from "../pin";
import { Scene } from "../scene";

export type SwitchProps = {
  inviteid: string;
};

export const Switch = memo(() => {
  const { collabSession } = useInvite();

  return (
    <Suspense fallback="loading">
      {collabSession?.sceneid ? <Scene /> : <Pin />}
    </Suspense>
  );
});

Switch.displayName = "Switch";
