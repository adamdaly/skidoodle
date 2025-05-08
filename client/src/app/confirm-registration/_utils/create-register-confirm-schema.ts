import { z } from "zod";

export const createRegisterConfirmSchema = () =>
  z.object({
    username: z.string().email().trim(),
    confirmationCode: z.string().min(1),
  });

export type RegisterConfirmSchema = z.infer<
  ReturnType<typeof createRegisterConfirmSchema>
>;
