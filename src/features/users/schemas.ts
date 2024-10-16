import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Required"),
  address: z.string().optional(),
  memo: z.string().optional(),
  registerDate: z.coerce.date(),
  job: z.enum(["개발자", "PO", "디자이너"]).optional(),
  hasAgreedToEmailReceive: z.boolean(),
});

export const userSchemaKeys = userSchema.keyof().enum;
