import { cookies } from "next/headers";

export const getAccessTokenCookie = async () => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .filter(({ name }) => name.startsWith("CognitoIdentityServiceProvider"))
    .map(({ name, value }) => `${name}=${value}`)
    .join("; "); 
