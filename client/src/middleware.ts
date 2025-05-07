import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import type { MiddlewareConfig, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  // const host = request.headers.get("host") ?? "localhost:3000";
  // const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  // const baseUrl = `${protocol}://${host}`;

  // if (
  //   request.nextUrl.pathname.startsWith("/sign-in") ||
  //   request.nextUrl.pathname.startsWith("/register")
  // ) {
  //   const accessToken = request.cookies.get("access_token");

  //   try {
  //     if (accessToken) {
  //       await axios.post("http://auth-server:3000/token/verify", {
  //         accessToken: accessToken.value,
  //       });

  //       return NextResponse.redirect(new URL("/dashboard", baseUrl));
  //     }
  //   } catch (e) {
  //     console.log("sign-in error", (e as AxiosError).status);
  //   }
  // }

  // if (request.nextUrl.pathname.startsWith("/signed-out")) {
  //   const cookieJar = await cookies();
  //   cookieJar.delete("access_token");
  //   cookieJar.delete("refresh_token");
  // }

  // if (
  //   request.nextUrl.pathname.startsWith("/dashboard") ||
  //   request.nextUrl.pathname.startsWith("/animations") ||
  //   request.nextUrl.pathname.startsWith("/scenes")
  // ) {
  //   const accessToken = request.cookies.get("access_token");
  //   const refreshToken = request.cookies.get("refresh_token");

  //   try {
  //     if (accessToken) {
  //       await axios.post("http://auth-server:3000/token/verify", {
  //         accessToken: accessToken.value,
  //       });
  //     } else {
  //       throw new Error();
  //     }
  //   } catch {
  //     if (refreshToken) {
  //       try {
  //         const response = await axios.post(
  //           "http://auth-server:3000/token/refresh",
  //           { refreshToken: refreshToken.value }
  //         );

  //         const cookieJar = await cookies();

  //         cookieJar.set("access_token", response.data.accessToken, {
  //           httpOnly: true,
  //           secure: false, // process.env.NODE_ENV === "production",
  //           // path: "/", // Cookie scope
  //           maxAge: 60 * 60 * 24, // 1 day in seconds
  //           sameSite: "lax",
  //         });

  //         cookieJar.set("refresh_token", response.data.refreshToken, {
  //           httpOnly: true,
  //           secure: false, // process.env.NODE_ENV === "production",
  //           // path: "/", // Cookie scope
  //           maxAge: 60 * 60 * 24, // 1 day in seconds
  //           sameSite: "lax",
  //         });
  //       } catch {
  //         return NextResponse.redirect(new URL("/sign-in", request.url));
  //       }
  //     } else {
  //       return NextResponse.redirect(new URL("/sign-in", request.url));
  //     }
  //   }
  // }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/sign-in",
    "/register",
    "/signed-out",
    "/dashboard",
    "/animations",
    "/animations/:path*",
    "/scenes/:path*",
  ],
};
