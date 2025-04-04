import { z } from "zod";

export const createSignInSchema = () =>
  z.object({
    username: z.string().trim().email(),
    password: z.string().trim().min(1),
  });

export type SignInSchema = z.infer<ReturnType<typeof createSignInSchema>>;
