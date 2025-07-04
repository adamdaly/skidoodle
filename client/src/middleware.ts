import { NextResponse } from "next/server";
import type { MiddlewareConfig, NextRequest } from "next/server";
import { configureAmplifyServer } from "./custom/utils/amplify-cognito-config-server";
import { authServiceServer } from "@/custom/services/auth/server";

configureAmplifyServer();

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const host = request.headers.get("host") ?? "localhost:3004";
  const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${protocol}://${host}`;

  const isAuthenticated = await authServiceServer.getIsAuthenticated();

  if (
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/register") ||
    request.nextUrl.pathname.startsWith("/signed-out")
  ) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", baseUrl));
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/animations") ||
    request.nextUrl.pathname.startsWith("/scenes") ||
    request.nextUrl.pathname.startsWith("/invite")
  ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/sign-in", baseUrl));
    }
  }

  return response;
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",

    "/sign-in",
    "/register",
    "/signed-out",

    "/dashboard",
    "/animations",
    "/animations/:path*",
    "/scenes/:path*",
  ],
};
