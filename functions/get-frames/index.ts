import AWS from "aws-sdk";
import util from "util";
import stream from "stream";

const s3 = new AWS.S3();
const pipeline = util.promisify(stream.pipeline);
const { Readable } = stream;

export const handler = awslambda.streamifyResponse(
  async (event, responseStream, context) => {
    responseStream.setContentType("multipart/related");

    const body = JSON.parse(event.body ?? "{}");
    const frames = body.frames ?? [];
    const bucketName = process.env.BUCKET_NAME;

    try {
      const results = await Promise.allSettled(
        frames.map(async (frame) => {
          const params = {
            Bucket: bucketName,
            Key: frame,
          };
          const response = await s3.getObject(params).promise();
          return { key: frame, body: response.Body };
        })
      );

      const filtered = results.filter(
        (result) => result.status === "fulfilled"
      );

      for (const frame of filtered) {
        const requestStream = Readable.from(
          Buffer.from(
            JSON.stringify({
              id: frame.value.key,
              length: frame.value.body.toString().length,
              type: "image/png",
              data: frame.value.body.toString("base64"),
            }) + "\n"
          )
        );
        await pipeline(requestStream, responseStream, { end: false });
      }
    } catch (error) {
      const errorMetadata = {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        error,
      };
      const requestErrorStream = Readable.from(
        Buffer.from(JSON.stringify(errorMetadata))
      );

      await pipeline(requestErrorStream, responseStream, { end: false });
    }

    responseStream.end();
  }
);
