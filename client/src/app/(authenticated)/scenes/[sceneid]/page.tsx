import { getScene as getSceneRequest } from "@/api/animation-api";
import { getAccessTokenCookie } from "@/custom/utils/get-access-token-cookie";

async function getScene(sceneid: string) {
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
  const { sceneid } = await params;
  const animation = await getScene(sceneid);

  return (
    <div>
      <div>Scene {sceneid}</div>
      <dl>
        <dt>Name</dt>
        <dd>{animation.name}</dd>
        <dt>Animation Id</dt>
        <dd>{animation.animationid}</dd>
        <dt>Created</dt>
        <dd>{animation.createdAt}</dd>
        <dt>Updated</dt>
        <dd>{animation.updatedAt}</dd>
      </dl>
    </div>
  );
}
