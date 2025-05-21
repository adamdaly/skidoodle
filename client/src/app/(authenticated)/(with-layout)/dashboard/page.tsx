import {
  getAnimations as getAnimationsRequest,
  getRecents as getRecentsRequest,
} from "@/custom/api/animation.api/server";
import { Animations } from "@/custom/components/animations";
import { FramesProvider } from "@/custom/components/frames";
import { H1, H2 } from "@/custom/components/typography";
import { Recents } from "./_components/recents";

async function getAnimations() {
  const result = await getAnimationsRequest();
  return result.data;
}

async function getRecents() {
  const result = await getRecentsRequest();
  return result.data;
}

export default async function Page() {
  const animations = await getAnimations();
  const recents = await getRecents();

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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_300px]">
        <div>
          <H1 className="mb-4">Animations</H1>
          <Animations animations={animations} />
        </div>
        <div>
          <H2 className="mb-2 md:text-right md:mt-2 md:mb-4">Recents</H2>
          <Recents recents={recents} />
        </div>
      </div>
    </FramesProvider>
  );
}
