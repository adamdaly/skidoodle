import express, { Request } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  existsSync,
  mkdirSync,
  readFile,
  readFileSync,
  writeFileSync,
  promises,
} from "fs";
import multer from "multer";
import { join } from "path";
import { Readable } from "stream";

const upload = multer();

const server = express();
server.use(cors());
const jsonParser = bodyParser.json();
server.use(jsonParser);

server.get("/", (req, res) => {
  res.send("ok");
});

const projectDirectory = process.cwd();
const directoryName = "frames";

// Ensure the folder exists
if (!existsSync(join(projectDirectory, directoryName))) {
  mkdirSync(join(projectDirectory, directoryName));
}

const directory = join(projectDirectory, directoryName);

server.use("/frames", express.static(directory));

type FramesRequest = Request<{}, {}, { frames: string[] }, {}>;

server.post("/frames", async (req: FramesRequest, res) => {
  const { frames } = req.body;

  if (!Array.isArray(frames)) {
    res.status(400).json({ messsage: "'frames' is not an array" });
    return;
  }

  const stream = new Readable({
    async read() {
      for (const frame of frames) {
        try {
          const imageBuffer = readFileSync(`${directory}/${frame}`);
          const chunk =
            JSON.stringify({
              id: frame,
              length: imageBuffer.length,
              type: "image/png",
              data: imageBuffer.toString("base64"),
            }) + "\n";

          this.push(chunk);
        } catch {
          console.log(`file: ${frame} not found`);
        }
      }
      this.push(null);
    },
  });

  stream.pipe(res);

  // res.setHeader("Content-Type", "application/zip");
  // res.setHeader("Content-Disposition", "attachment; filename=images.zip");

  // const archive = archiver("zip", {
  //   zlib: {
  //     level: 9,
  //   },
  // });

  // archive.pipe(res);

  // await Promise.allSettled(
  //   frames.map((frame) => {
  //     const path = `${directory}/${frame}`;
  //     if (existsSync(path)) {
  //       archive.file(path, { name: frame });
  //     }
  //     // TODO - add placeholder image if image doesn't exist
  //   })
  // );

  // archive.finalize();
});

server.post("/", upload.single("file"), (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400).send("No file");
  } else {
    try {
      writeFileSync(`${directory}/${file.originalname}`, file.buffer, {});
    } catch (e) {
      res.status(400).send("writeFileSync failed");
    }
    res.status(201).send("ok");
  }
});

type PatchRequest = Request<{ id: number }, any, {}, {}>;

server.patch(
  "/",
  upload.single("file"),
  (req: Request<{ id: string }>, res) => {
    console.log("file", req.file);
    const file = req.file;
    if (!file) {
      res.status(400).send("No file");
    } else {
      try {
        const hasFile = existsSync(join(directory, file?.originalname));

        if (!hasFile) {
          res.status(400).send("File doesn't exist");
        } else {
          writeFileSync(`${directory}/${file.originalname}`, file.buffer, {});
        }
      } catch (e) {
        res.status(400).send("writeFileSync failed");
      }
      res.status(201).send("ok");
    }
  }
);

export default server;
