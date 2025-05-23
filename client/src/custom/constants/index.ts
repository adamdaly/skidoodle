export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

export const COGNITO_CLIENT_ID =
  process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? "";

export const COGNITO_USER_POOL_ID =
  process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? "";

export const COGNITO_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET ?? "";

export const COGNITO_ISSUER = process.env.NEXT_PUBLIC_COGNITO_ISSUER ?? "";

export const FRAMES_RETRIEVE_URL =
  process.env.NEXT_PUBLIC_FRAMES_RETRIEVE_URL ?? "";

export const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;
