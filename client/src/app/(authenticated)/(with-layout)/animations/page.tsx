import { getAnimations as getAnimationsRequest } from "@/custom/api/animation.api/server";
import { Animations } from "@/custom/components/animations";
import { FramesProvider } from "@/custom/components/frames";
import { H1 } from "@/custom/components/typography";

async function getAnimations() {
  const result = await getAnimationsRequest({
    params: {
      frameTake: 10,
    },
  });

  return result.data;
}

export default async function Page() {
  const animations = await getAnimations();

  const frames = [
    ...new Set(
      animations
        .map((animation) =>
          animation.Scene.map((scene) =>
            scene.Frame.map((frame) => frame.filename).flat()
          ).flat()
        )
        .flat()
    ),
  ];

  return (
    <FramesProvider {...{ frames }}>
      <div>
        <H1 className="mb-6">Animations</H1>
        <Animations {...{ animations }} />
      </div>
    </FramesProvider>
  );
}
