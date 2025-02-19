import { z } from "zod";

export const loginSchema = z.object({
  nickname: z.string().min(3, "Nickname must be at least 3 characters long").max(20, "Nickname must be at most 20 characters long"),
});
