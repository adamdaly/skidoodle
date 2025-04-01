import { getAnimation as getAnimationRequest } from "@/api/animation-api";
import { getAccessTokenCookie } from "@/custom/utils/get-access-token-cookie";
import { CreateScene } from "./_components/create-scene";

async function getAnimation(animationid: string) {
  const result = await getAnimationRequest(animationid, {
    headers: {
      Cookie: await getAccessTokenCookie(),
    },
  });

  return result.data;
}

export default async function Animation({
  params,
}: {
  params: Promise<{ animationid: string }>;
}) {
  const { animationid } = await params;
  const animation = await getAnimation(animationid);

  return (
    <div>
      <div>Animation {animationid}</div>
      <dl>
        <dt>Name</dt>
        <dd>{animation.name}</dd>
        <dt>Width</dt>
        <dd>{animation.width}</dd>
        <dt>Height</dt>
        <dd>{animation.height}</dd>
        <dt>Framerate</dt>
        <dd>{animation.framerate}</dd>
        <dt>Created</dt>
        <dd>{animation.createdAt}</dd>
        <dt>Updated</dt>
        <dd>{animation.updatedAt}</dd>
      </dl>
      <CreateScene />
    </div>
  );
}
