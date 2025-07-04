"use client";

import { ComponentType, memo } from "react";

export type SceneProps = {
  Header: ComponentType;
  Controls: ComponentType;
  Tools: ComponentType;
  Canvas: ComponentType;
  Info: ComponentType;
  Timeline: ComponentType;
  Frames: ComponentType;
  aspectRatio: number;
};

export const SceneWrapper = memo(
  ({
    Header,
    Controls,
    Tools,
    Canvas,
    Info,
    Timeline,
    Frames,
    aspectRatio,
  }: SceneProps) => {
    return (
      <div className="grid h-screen max-h-screen grid-cols-1 grid-rows-[auto_1fr] gap-0">
        {/*<!-- Header -->*/}
        <div className="flex-grow-0 flex-shrink-0 mx-auto w-full max-w-7xl px-4 py-4">
          <Header />
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
                      aspectRatio,
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
    );
  }
);

SceneWrapper.displayName = "Scene";
