import { cookies } from "next/headers";

export const getAccessTokenCookie = async () => {
  const cookieJar = await cookies();
  const accessToken = cookieJar.get("access_token");

  return `${accessToken?.name}=${accessToken?.value}`;
};
