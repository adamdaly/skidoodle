import { NextFunction } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ?? "your-access-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ?? "your-refresh-secret";

export const authenticate = async (
  req: any, // Request,
  res: any, // Response,
  next: NextFunction
) => {
  const headers = req.headers;
  const cookies = req.cookies;

  console.log(headers, cookies);
  next();

  // try {

  //   const accessTokenPayload = jwt.verify(
  //     accessToken,
  //     ACCESS_TOKEN_SECRET
  //   ) as jwt.JwtPayload;

  // } catch (e) {
  //   if (e instanceof TokenExpiredError) {

  //       try {

  //         const refreshTokenPayload = jwt.verify(
  //           accessToken,
  //           ACCESS_TOKEN_SECRET
  //         ) as jwt.JwtPayload;

  //       }
  //   }
  // }

  // verify accessToken
  //  if accessToken.expiresOn > now
  //    verify refreshToken
  //      if refreshToken.expiresOn < now
  //        throw not authenticated error
  //      else
  //        return sign new access token
  //  else accessToken.expiresOn < now
  //    return accessToken
};
