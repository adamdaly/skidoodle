export const createFileFromData = async (
  width: number,
  height: number,
  data: string,
  filename: string
) => {
  const { promise, resolve, reject } = Promise.withResolvers<void>();

  const canvas = new OffscreenCanvas(width, height);
  const context = canvas.getContext("2d");

  const img = new Image();

  img.onload = () => {
    context?.drawImage(img, 0, 0);
    resolve();
  };

  img.onerror = reject;

  img.src = `data:image/png;base64,${data}`;

  await promise;

  const blob = await canvas.convertToBlob();
  return new File([blob], filename, { type: "image/png" });
};
