import { FRAMES_RETRIEVE_URL } from "../constants";

type Data = {
  id: string;
  type: string;
  data: string;
};

export const getImageData = async (
  frames: string[],
  callback: (data: Data) => void
) => {
  if (frames.length === 0) {
    return;
  }

  const response = await fetch(`${FRAMES_RETRIEVE_URL}/frames`, {
    method: "post",
    body: JSON.stringify({
      frames,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const reader = response.body?.getReader();
  if (!reader) {
    return;
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done || value === undefined) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();

    for (const line of lines) {
      if (!line) {
        continue;
      }

      callback(JSON.parse(line));
    }
  }
};
