import { confirmPin } from "@/custom/api/collab.api/client";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getAnimation as getAnimationRequest,
  getScene as getSceneRequest,
} from "@/custom/api/animation.api/client";
import { Animation, CollabSession, Scene } from "@/custom/types";

export const useInviteContextLogic = (inviteid: string) => {
  const [collabSession, setCollabSession] = useState<CollabSession | null>(
    null
  );

  useEffect(() => {
    const storedCollabSessionStr = sessionStorage.getItem(
      "skidoodle.collab.session"
    );

    if (storedCollabSessionStr) {
      const storedCollabSession = JSON.parse(storedCollabSessionStr);
      setCollabSession(storedCollabSession);
    }
  }, []);

  useEffect(() => {
    if (collabSession) {
      sessionStorage.setItem(
        "skidoodle.collab.session",
        JSON.stringify(collabSession)
      );
    }
  }, [collabSession]);

  const onConfirmPin = useCallback(
    async (pin: string) => {
      const response = await confirmPin({ inviteid, pin });
      setCollabSession(response.data);
    },
    [inviteid]
  );

  const getScene = useCallback(async (sceneid: number) => {
    const result = await getSceneRequest(sceneid);
    return result.data;
  }, []);

  const getAnimation = useCallback(async (animationid: number) => {
    const result = await getAnimationRequest(animationid);
    return result.data;
  }, []);

  const {
    promise: data,
    resolve,
    reject,
  } = useMemo(
    () => Promise.withResolvers<{ animation: Animation; scene: Scene }>(),
    []
  );

  const getData = useCallback(async () => {
    if (collabSession?.sceneid) {
      try {
        const scene = await getScene(collabSession.sceneid);
        const animation = await getAnimation(scene.animationid);

        resolve({
          scene,
          animation,
        });
      } catch (e) {
        reject(e);
      }
    }
  }, [collabSession?.sceneid]);

  useEffect(() => {
    if (collabSession?.sceneid) {
      getData();
    }
  }, [collabSession?.sceneid]);

  return {
    inviteid,
    onConfirmPin,
    collabSession,
    getData,
    data,
  } as const;
};
