import { z } from "zod";

export const createRegisterSchema = () =>
  z.object({
    username: z.string().email().trim(),
    password: z.string().min(1),
  });

export type RegisterSchema = z.infer<ReturnType<typeof createRegisterSchema>>;
