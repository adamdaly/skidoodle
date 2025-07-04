/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "skidoodle",
      removal: "remove",
      protect: false,
      // removal: input?.stage === "production" ? "retain" : "remove",
      // protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("skidoodleVpc", {
      nat: "ec2",
    });
    const cluster = new sst.aws.Cluster("skidoodleCluster", {
      vpc,
    });

    const bucket = new sst.aws.Bucket("skidoodleBucket", {
      cors: {
        allowMethods: ["GET", "PUT", "POST", "DELETE"],
        allowOrigins: [
          "https://api.skidoodle.net",
          "https://skidoodle.net",
          "https://www.skidoodle.net",
        ],
        allowHeaders: ["*"],
      },
    });

    const getFrames = new sst.aws.Function("skidoodleGetFrames", {
      handler: "./functions/get-frames/index.handler",
      url: {
        cors: {
          allowMethods: ["POST"],
          allowOrigins: ["https://skidoodle.net", "https://api.skidoodle.net"],
        },
      },
      streaming: true,
      timeout: "5 seconds",
      link: [bucket],
      environment: {
        BUCKET_NAME: bucket.name,
      },
    });

    const collabInvites = new sst.aws.Dynamo("skidoodleCollabInvites", {
      fields: {
        id: "string",
      },
      primaryIndex: { hashKey: "id" },
    });

    const collabSessions = new sst.aws.Dynamo("skidoodleCollabSessions", {
      fields: {
        parentSessionId: "string",
        sessionid: "string",
      },
      primaryIndex: { hashKey: "parentSessionId", rangeKey: "sessionid" },
    });

    const api = new sst.aws.Service("skidoodleApi", {
      cluster,
      link: [bucket, collabInvites, collabSessions],
      loadBalancer: {
        domain: {
          name: "api.skidoodle.net",
        },
        rules: [
          { listen: "80/http", redirect: "443/https" },
          { listen: "443/https", forward: "3000/http" },
        ],
        ports: [
          { listen: "80/http" },
          { listen: "443/https", forward: "3000/http" },
        ],
      },
      image: {
        context: "./server",
        dockerfile: "Dockerfile",
      },
      environment: {
        AWS_REGION: process.env.AWS_REGION,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        AWS_BUCKET: bucket.name,
        AWS_COLLAB_INVITES: collabInvites.name,
        AWS_COLLAB_SESSIONS: collabSessions.name,
        DATABASE_URL: process.env.AWS_DB_URL,
        COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
        COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
        NODE_ENV: "production",
      },
    });

    const client = new sst.aws.Nextjs("skidoodleClient", {
      vpc,
      domain: {
        name: "skidoodle.net",
        dns: sst.aws.dns(), // Assumes Route 53 or configured DNS
      },
      link: [api, getFrames],
      path: "./client",
      server: {
        timeout: "60 seconds", // Increase Lambda timeout
        memory: "512 MB", // Increase memory to improve performance
      },
      transform: {
        server: {
          concurrency: {
            reserved: 10,
          },
        },
      },
      environment: {
        AMPLIFY_APP_ORIGIN: process.env.AMPLIFY_APP_ORIGIN,
        NEXT_PUBLIC_SERVER_URL: api.url,
        NEXT_PUBLIC_CLIENT_SERVER_URL: api.url,
        NEXT_PUBLIC_COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
        NEXT_PUBLIC_COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
        NEXT_PUBLIC_FRAMES_RETRIEVE_URL: getFrames.url,
      },
    });

    return {
      apiUrl: api.url,
      clientUrl: client.url,
      getFramesUrl: getFrames.url,
      collabInvites: collabInvites.urn,
    };
  },
});
