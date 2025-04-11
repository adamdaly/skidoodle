import { notFound } from "next/navigation";
import { getAnimation as getAnimationRequest } from "@/custom/api/animation.api";
import { FramesProvider } from "@/custom/components/frames";
import { H1, H2 } from "@/custom/components/typography";
import { getAccessTokenCookie } from "@/custom/utils/get-access-token-cookie";
import { AnimationProvider } from "./_components/context";
import { Scenes } from "./_components/scenes";

async function getAnimation(animationid: string) {
  const result = await getAnimationRequest(animationid, {
    headers: {
      Cookie: await getAccessTokenCookie(),
    },
    params: {
      frameTake: 10,
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

  if (!animation) {
    return notFound();
  }

  const frames = [
    ...new Set(
      animation.Scene.map((scene) =>
        scene.Frame.map((frame) => frame.filename).flat()
      ).flat()
    ),
  ];

  return (
    <FramesProvider {...{ frames }}>
      <AnimationProvider animation={animation}>
        <H1 className="mb-4">{animation.name}</H1>
        <H2 className="mb-2 text-2xl">Info</H2>
        <dl className="mb-4">
          <dt className="inline-block mr-2 font-semibold">Width</dt>
          <dd className="inline-block mr-4">{animation.width}</dd>
          <dt className="inline-block mr-2 font-semibold">Height</dt>
          <dd className="inline-block mr-4">{animation.height}</dd>
          <dt className="inline-block mr-2 font-semibold">Framerate</dt>
          <dd className="inline-block mr-4">{animation.framerate}</dd>
        </dl>
        <H2 className="mb-4">Scenes</H2>
        <Scenes />
      </AnimationProvider>
    </FramesProvider>
  );
}
