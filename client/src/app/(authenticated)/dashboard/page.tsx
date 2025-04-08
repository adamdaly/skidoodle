import {
  getAnimations as getAnimationsRequest,
  getRecents as getRecentsRequest,
} from "@/custom/api/animation.api";
import { H1, H2 } from "@/custom/components/typography";
import { Animations } from "./_components/animations";
import { Recents } from "./_components/recents";
import { getAccessTokenCookie } from "@/custom/utils/get-access-token-cookie";
import { FramesProvider } from "./_components/context";

async function getAnimations() {
  const result = await getAnimationsRequest({
    headers: {
      Cookie: await getAccessTokenCookie(),
    },
  });

  return result.data;
}

async function getRecents() {
  const result = await getRecentsRequest({
    headers: {
      Cookie: await getAccessTokenCookie(),
    },
  });

  return result.data;
}

export default async function Page() {
  const animations = await getAnimations();
  const recents = await getRecents();

  return (
    <FramesProvider {...{ animations }}>
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
