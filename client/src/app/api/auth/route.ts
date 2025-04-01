// "use server";
// import { cookies } from "next/headers";
// import { ZodError } from "zod";

// import { postSignIn } from "@/api/auth-api";
// import {
//   createSignInSchema,
//   SignInSchema,
// } from "../../_utils/create-sign-up-schema";
// import { NextResponse } from "next/server";

// export type SignInState = SignInSchema & {
//   errors: ZodError;
// };

// export async function signIn(formData: FormData) {
//   const schema = createSignInSchema();
//   const { username, password } = Object.fromEntries(formData);

//   const validationState = schema.safeParse({
//     username,
//     password,
//   });

//   if (!validationState.success) {
//     throw new Error("Invalid data", { cause: validationState });
//   }

//   const result = await postSignIn({
//     username: username as string,
//     password: password as string,
//   });

//   const response = new NextResponse();

//   return {
//     data: result.data,
//     success: true,
//   }
// }
// };

import { postSignIn } from "@/api/auth-api";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  console.log(username, password);

  try {
    const result = await axios.post("http://localhost:3002/sign-in", {
      username,
      password,
    });

    console.log("access_token", result.data);

    // (await cookies()).set('access_token', result.data.accessToken, {
    //   sameSite:'lax',
    //   si
    // })

    const cookieJar = await cookies();

    cookieJar.set("access_token", result.data.accessToken, {
      httpOnly: true,
      secure: false, // process.env.NODE_ENV === "production", // Secure in production
      // path: "/", // Cookie scope
      maxAge: 60 * 60 * 24, // 1 day in seconds
      sameSite: "lax", //
    });

    cookieJar.set("refresh_token", result.data.refreshToken, {
      httpOnly: true,
      secure: false, // process.env.NODE_ENV === "production", // Secure in production
      // path: "/", // Cookie scope
      maxAge: 60 * 60 * 24, // 1 day in seconds
      sameSite: "lax", //
    });

    return NextResponse.json(
      { message: "ok" },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "fail" },
      {
        status: 401,
      }
    );
  }
}
