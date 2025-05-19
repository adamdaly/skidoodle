import { Provider } from "jotai";
import Link from "next/link";
import {
  getAnimation as getAnimationRequest,
  getScene as getSceneRequest,
} from "@/custom/api/animation.api/server";
import { Header } from "@/custom/modules/header";
import { Footer } from "@/custom/components/footer";
import { Canvas } from "./_components/canvas";
import { SceneProvider } from "./_components/context";
import { Controls } from "./_components/controls";
import { Frames } from "./_components/frames";
import { Timeline } from "./_components/timeline";
import { Tools } from "./_components/tools";
import { Info } from "./_components/info";

async function getScene(sceneid: number) {
  const result = await getSceneRequest(sceneid);
  return result.data;
}

async function getAnimation(animationid: number) {
  const result = await getAnimationRequest(animationid);

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
    <Provider>
      <SceneProvider {...{ animation, scene }}>
        <div className="grid h-screen max-h-screen grid-cols-1 grid-rows-[auto_1fr] gap-0">
          {/*<!-- Header -->*/}
          <div className="flex-grow-0 flex-shrink-0 mx-auto w-full max-w-7xl px-4 py-4">
            <Header>
              <span className="">
                <Link href={`/animations/${animation.id}`}>
                  <span className="inline-block mx-2 font-bold">/</span>
                  <span className="font-bold underline">{animation.name}</span>
                </Link>
                <span className="inline-block mx-2 font-bold">/</span>
                {scene.name}
              </span>
            </Header>
          </div>
          {/*<!-- Interface -->*/}
          <main className="grid grid-cols-1 grid-rows-[1fr_auto_auto] gap-0">
            {/*<!-- Board -->*/}
            <section className="grid grid-cols-[88px_1fr_200px] grid-rows-[auto_1fr] gap-0">
              {/*<!-- Controls Row -->*/}
              <div className="col-span-3 grid grid-cols-subgrid">
                <div></div> {/*<!-- Empty left spacer -->*/}
                <div className="controls">
                  <Controls />
                </div>
                <div></div> {/*<!-- Empty right spacer -->*/}
              </div>

              {/*<!-- Main Board Row -->*/}
              <aside className="tools">
                <Tools />
              </aside>
              <div className="canvas flex justify-center items-center p-10">
                <div className="relative w-full h-full">
                  <div className="absolute top-0 right-0 bottom-0 left-0">
                    <div
                      className="relative max-w-full max-h-full left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                      style={{
                        aspectRatio: animation.width / animation.height,
                      }}
                    >
                      <Canvas />
                    </div>
                  </div>
                </div>
              </div>
              <aside className="options">
                <Info />
              </aside>
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
        <Footer />
      </SceneProvider>
    </Provider>
  );
}
