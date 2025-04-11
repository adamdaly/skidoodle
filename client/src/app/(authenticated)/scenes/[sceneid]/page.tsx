import {
  getAnimation as getAnimationRequest,
  getScene as getSceneRequest,
} from "@/custom/api/animation.api";
import { getAccessTokenCookie } from "@/custom/utils/get-access-token-cookie";
import { SceneProvider } from "./_components/context";
import { Frames } from "./_components/frames";
import { Timeline } from "./_components/timeline";
import { Header } from "@/custom/modules/header";
import { Canvas } from "./_components/canvas";

async function getScene(sceneid: number) {
  const result = await getSceneRequest(sceneid, {
    headers: {
      Cookie: await getAccessTokenCookie(),
    },
  });

  return result.data;
}

async function getAnimation(animationid: number) {
  const result = await getAnimationRequest(animationid, {
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
  const animation = await getAnimation(scene.animationid);

  return (
    <SceneProvider {...{ animation, scene }}>
      <div className="grid h-screen max-h-screen grid-cols-1 grid-rows-[auto_1fr] gap-0">
        {/*<!-- Header -->*/}
        <div className="flex-grow-0 flex-shrink-0 mx-auto w-screen max-w-7xl px-4 py-4">
          <Header />
        </div>
        {/*<!-- Interface -->*/}
        <main className="grid grid-cols-1 grid-rows-[1fr_auto_auto] gap-0">
          {/*<!-- Board -->*/}
          <section className="grid grid-cols-[80px_1fr_200px] grid-rows-[auto_1fr] gap-0">
            {/*<!-- Controls Row -->*/}
            <div className="col-span-3 grid grid-cols-subgrid">
              <div></div> {/*<!-- Empty left spacer -->*/}
              <div className="controls">{/*<!-- Controls content -->*/}</div>
              <div></div> {/*<!-- Empty right spacer -->*/}
            </div>

            {/*<!-- Main Board Row -->*/}
            <aside className="tools">{/*<!-- Tools content -->*/}</aside>
            <div className="canvas flex justify-center items-center p-10">
              <Canvas />
            </div>
            <aside className="options">{/*<!-- Options content -->*/}</aside>
          </section>

          {/*<!-- Timeline -->*/}
          <div className="timeline h-10">
            <Timeline />
          </div>

          {/*<!-- Frames -->*/}
          <div className="frames min-h-[160px] max-h-[200px]">
            <Frames />
          </div>
        </main>
      </div>
    </SceneProvider>
  );
}

{
  /* <div className="flex-grow-0 flex-shrink-0 mx-auto w-screen max-w-7xl px-4 py-4">
  <Header />
</div>
<div className="w-full h-screen grid grid-cols-1 grid-rows-[8fr_40px_160px] grid-areas-container gap-0">
  <div className="grid grid-cols-[1fr_8fr_1fr] grid-rows-[60px_1fr] grid-areas-interface gap-0">
    <div className="grid-in-tools"></div>
    <div className="grid-in-canvas"></div>
    <div className="grid-in-options"></div>
    <div className="grid-in-controls"></div>
  </div>
  <div className="grid-in-timeline"> <Timeline /></div>
  <div className="grid-in-frames">{<Frames />}</div>
</div> */
}
