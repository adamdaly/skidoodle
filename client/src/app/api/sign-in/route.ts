import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  try {
    const result = await axios.post("http://auth-server:3000/sign-in", {
      username,
      password,
    });

    const cookieJar = await cookies();

    cookieJar.set("access_token", result.data.accessToken, {
      httpOnly: true,
      secure: false, // TODO - Secure in production
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day in seconds
      sameSite: "lax",
    });

    cookieJar.set("refresh_token", result.data.refreshToken, {
      httpOnly: true,
      secure: false, // TODO - Secure in production
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day in seconds
      sameSite: "lax",
    });

    return NextResponse.json(
      { message: "ok" },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "fail", e },
      {
        status: 401,
      }
    );
  }
}
