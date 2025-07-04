import {
  getAnimation as getAnimationRequest,
  getScene as getSceneRequest,
} from "@/custom/api/animation.api/server";
import { Scene } from "./_components/scene";

async function getScene(sceneid: number) {
  const result = await getSceneRequest(sceneid);
  return result.data;
}

async function getAnimation(animationid: number) {
  const result = await getAnimationRequest(animationid);

  return result.data;
}

export default async function Page({
  params,
}: {
  params: Promise<{ sceneid: string }>;
}) {
  const p = await params;

  const sceneid = parseInt(p.sceneid, 10);

  if (Number.isNaN(sceneid)) {
    throw new Error(`Unknown Scene Id: ${sceneid}`);
  }

  const scene = await getScene(sceneid);
  const animation = await getAnimation(scene.animationid);

  return <Scene {...{ animation, scene }} />;
}
