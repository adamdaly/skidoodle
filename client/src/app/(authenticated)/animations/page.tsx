import {
  getAnimations as getAnimationsRequest,
  getRecents as getRecentsRequest,
} from "@/api/animation-api";
import { H1, H2 } from "@/custom/components/typography";
import { getAccessTokenCookie } from "@/custom/utils/get-access-token-cookie";
import { AnimationList } from "./_components/animation-list";
import { RecentsList } from "./_components/recents-list";

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

export default async function Animations() {
  const animations = await getAnimations();
  console.log(animations);
  const recents = await getRecents();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_300px]">
      <div>
        <H1 className="mb-4">Animations</H1>
        <AnimationList animations={animations} />
      </div>
      <div>
        <H2 className="mb-2 md:text-right">Recents</H2>
        <RecentsList recents={recents} />
      </div>
    </div>
  );
}
