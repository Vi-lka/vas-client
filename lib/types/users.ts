import { z } from "zod";


export const StatusEnum = z.enum(["получена", "одобрена", "на доработке"]);
export type StatusEnum = z.infer<typeof StatusEnum>;

export const CurrentUserT = z.object({
    id: z.string().or(z.number()),
    username: z.string(),
    email: z.string(),
    confirmed: z.boolean().nullable(),
    blocked: z.boolean().nullable(),
    report: z.boolean(),
    subscribedContent: z.boolean().nullable(),
    subscribedReport: z.boolean().nullable(),
    role:z.object({
        id: z.string().or(z.number()),
        name: z.string(),
        type: z.string().nullable(),
    }).nullable(),
    metadata: z.any(),
    file: z.object({
      data: z.object({
        attributes: z.object({
          url: z.string()
        })
      }).nullable()
    }),
    image: z.object({
      data: z.object({
        attributes: z.object({
          url: z.string()
        })
      }).nullable()
    }),
    status: StatusEnum.nullable(),
  })
export type CurrentUserT = z.infer<typeof CurrentUserT>;