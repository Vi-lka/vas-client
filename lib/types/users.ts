import { z } from "zod";


export const StatusEnum = z.enum(["получена", "одобрена", "на доработке"]);
export type StatusEnum = z.infer<typeof StatusEnum>;

export const StatusTranslitEnum = z.enum(["poluchena", "odobrena", "na_dorabotke"]);
export type StatusTranslitEnum = z.infer<typeof StatusTranslitEnum>;

export const CurrentUserT = z.object({
    id: z.string().or(z.number()),
    username: z.string(),
    email: z.string(),
    confirmed: z.boolean().nullable(),
    blocked: z.boolean().nullable(),
    report: z.boolean().nullable(),
    status: StatusEnum.nullable(),
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
  })
export type CurrentUserT = z.infer<typeof CurrentUserT>;

export const UsersT = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number()
    })
  }),
  data: z.object({
    id: z.string(),
    attributes: z.object({
      username: z.string(),
      email: z.string(),
      confirmed: z.boolean().nullable(),
      blocked: z.boolean().nullable(),
      report: z.boolean().nullable(),
      status: StatusTranslitEnum.nullable(),
      subscribedContent: z.boolean().nullable(),
      subscribedReport: z.boolean().nullable(),
      metadata: z.any(),
      role: z.object({
        data: z.object({
          id: z.string().or(z.number()),
          attributes: z.object({
            name: z.string(),
            type: z.string().nullable(),    
          })
        }).nullable()
      }),
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
    })
  }).array()
});
export type UsersT = z.infer<typeof UsersT>;
