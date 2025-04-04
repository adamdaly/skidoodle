import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  try {
    await axios.post("http://auth-server:3000/register", {
      username,
      password,
    });

    return NextResponse.json(
      { message: "ok" },
      {
        status: 200,
      }
    );
  } catch (e) {
    if (isAxiosError(e)) {
      return NextResponse.json(e.response?.data, {
        status: e.status,
      });
    } else {
      return NextResponse.next({ status: 500 });
    }
  }
}
