import { NextResponse } from "next/server";
import type { MiddlewareConfig, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { postTokenRefresh, postTokenVerify } from "./api/auth-api";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/sign-in")) {
    const accessToken = request.cookies.get("access_token");

    try {
      if (accessToken) {
        await postTokenVerify(accessToken.value);
        return NextResponse.redirect(new URL("/animations", request.url));
      }
    } catch {}
  }

  if (request.nextUrl.pathname.startsWith("/signed-out")) {
    const cookieJar = await cookies();
    cookieJar.delete("access_token");
    cookieJar.delete("refresh_token");
  }

  if (
    request.nextUrl.pathname.startsWith("/animations") ||
    request.nextUrl.pathname.startsWith("/scenes")
  ) {
    const accessToken = request.cookies.get("access_token");
    const refreshToken = request.cookies.get("refresh_token");

    try {
      if (accessToken) {
        await postTokenVerify(accessToken.value);
      } else {
        throw new Error();
      }
    } catch {
      if (refreshToken) {
        try {
          const response = await postTokenRefresh(refreshToken.value);

          const cookieJar = await cookies();

          cookieJar.set("access_token", response.data.accessToken, {
            httpOnly: true,
            secure: false, // process.env.NODE_ENV === "production",
            // path: "/", // Cookie scope
            maxAge: 60 * 60 * 24, // 1 day in seconds
            sameSite: "lax",
          });

          cookieJar.set("refresh_token", response.data.refreshToken, {
            httpOnly: true,
            secure: false, // process.env.NODE_ENV === "production",
            // path: "/", // Cookie scope
            maxAge: 60 * 60 * 24, // 1 day in seconds
            sameSite: "lax",
          });
        } catch {
          return NextResponse.redirect(new URL("/sign-in", request.url));
        }
      } else {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
  }
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/sign-in",
    "/signed-out",
    "/animations",
    "/animations/:path*",
    "/scenes/:path*",
  ],
};
