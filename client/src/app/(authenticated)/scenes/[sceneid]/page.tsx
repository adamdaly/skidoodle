import { getScene as getSceneRequest } from "@/api/animation-api";
import { getAccessTokenCookie } from "@/custom/utils/get-access-token-cookie";
import { SceneProvider } from "./_components/context";
import { Frames } from "./_components/frames";

async function getScene(sceneid: number) {
  const result = await getSceneRequest(sceneid, {
    headers: {
      Cookie: await getAccessTokenCookie(),
    },
  });

  return result.data;
}

export default async function Scene({
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

  return (
    <SceneProvider {...{ scene }}>
      <p>{sceneid}</p>
      <Frames />
    </SceneProvider>
  );
}
