import { notFound } from "next/navigation";
import { getAnimation as getAnimationRequest } from "@/custom/api/animation.api/server";
import { FramesProvider } from "@/custom/components/frames";
import { H1, H2 } from "@/custom/components/typography";
import { AnimationProvider } from "./_components/context";
import { Scenes } from "./_components/scenes";
import { AnimationDelete } from "./_components/animation-delete";

async function getAnimation(animationid: number) {
  const result = await getAnimationRequest(animationid, {
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
  const p = await params;

  const animationid = parseInt(p.animationid, 10);

  if (Number.isNaN(animationid)) {
    throw new Error(`Unknown Animation Id: ${animationid}`);
  }

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
        <H1 className="flex items-center mb-4">
          {animation.name} <AnimationDelete id={animationid} />
        </H1>
        <section className="flex">
          <div className="flex-grow-1">
            <H2 className="mb-4">Scenes</H2>
            <Scenes />
          </div>
          <aside className="flex-[0_0_200px] ml-6">
            <H2 className="mb-2 text-2xl">Info</H2>
            <dl className="mb-4">
              <dt className="mr-2 font-semibold">Width</dt>
              <dd className="mr-4">{animation.width}</dd>
              <dt className="mr-2 font-semibold">Height</dt>
              <dd className="mr-4">{animation.height}</dd>
              <dt className="mr-2 font-semibold">Framerate</dt>
              <dd className="mr-4">{animation.framerate}</dd>
            </dl>
          </aside>
        </section>
      </AnimationProvider>
    </FramesProvider>
  );
}
