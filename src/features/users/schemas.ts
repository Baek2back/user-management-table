import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Required"),
  address: z.string().optional(),
  memo: z.string().optional(),
  registerDate: z.coerce.date(),
  job: z.enum(["개발자", "PO", "디자이너"]).optional(),
  hasAgreedToEmailReceive: z.boolean().optional(),
});
