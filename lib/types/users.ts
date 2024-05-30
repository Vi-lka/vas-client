import { z } from "zod";


export const CurrentUserT = z.object({
    id: z.string().or(z.number()),
    username: z.string(),
    email: z.string(),
    confirmed: z.boolean().nullable(),
    blocked: z.boolean().nullable(),
    subscribed: z.boolean().nullable(),
    role:z.object({
        id: z.string().or(z.number()),
        name: z.string(),
        type: z.string().nullable(),
    }).nullable(),
    metadata: z.any()
  })
export type CurrentUserT = z.infer<typeof CurrentUserT>;