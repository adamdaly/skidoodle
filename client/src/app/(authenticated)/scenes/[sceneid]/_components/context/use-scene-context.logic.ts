import { useCallback, useEffect, useState } from "react";
import JSZip from "jszip";
import { getFrames, postFrame } from "@/api/animation-api";
import { Scene } from "@/custom/types";

export const useSceneContextLogic = (scene: Scene) => {
  const [frames, setFrames] = useState<
    [string, OffscreenCanvas, OffscreenCanvasRenderingContext2D][]
  >([]);

  const onFrameAdd = useCallback(async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    const context = canvas.getContext("2d")!;

    context.lineWidth = 100;
    context.beginPath();
    context.rect(0, 0, 1920, 1080);
    context.stroke();

    context.font = "100px Arial";
    context.fillText("Skidoodle", 1920 / 2, 1080 / 2);
    context.fillText(frames.length.toString(), 100, 200);

    const canvasBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!); // TODO
      });
    });

    const file = new File([canvasBlob], "frame.png", { type: "image/png" });

    try {
      const response = await postFrame({
        index: frames.length,
        length: 2,
        sceneid: scene.id,
        file,
      });

      const canvas2 = new OffscreenCanvas(1920, 1080);
      const context2 = canvas2.getContext("2d")!;

      context2.drawImage(canvas, 0, 0);

      setFrames((currentFrames) => [
        ...currentFrames,
        [response.data.filename, canvas2, context2],
      ]);
    } catch (e) {
      console.log(e);
    }
  }, [frames.length, scene.id]);

  const getInitialFramesData = useCallback(async () => {
    const framesData = scene.Frame.map((frame) => frame.filename);
    const response = await getFrames(framesData, {
      responseType: "blob",
    });

    const zip = new JSZip();
    const zipData = await zip.loadAsync(response.data);

    const canvases: [
      string,
      OffscreenCanvas,
      OffscreenCanvasRenderingContext2D
    ][] = [];

    for (const [filename, file] of Object.entries(zipData.files)) {
      const fileBlob = await file.async("blob");

      const bitmap = await createImageBitmap(fileBlob);

      const canvas = new OffscreenCanvas(1920, 1080);
      const context = canvas.getContext("2d")!;

      context.drawImage(bitmap, 0, 0, 1920, 1080);

      canvases.push([filename, canvas, context]);
    }
    setFrames(canvases);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getInitialFramesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    scene,
    frames,
    onFrameAdd,
  } as const;
};
