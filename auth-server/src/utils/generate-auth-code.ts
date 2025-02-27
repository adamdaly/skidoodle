import { randomBytes } from "crypto";

// Generate a secure authorization code
export const generateAuthCode = (length: number = 32): string => {
  return randomBytes(length / 2)
    .toString("hex")
    .slice(0, length);
};
