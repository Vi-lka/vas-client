import { z } from "zod";

export const AboutT  = z.object({
    attributes: z.object({
        text: z.any()
    }),
})
export type AboutT = z.infer<typeof AboutT>;

export const OrgsT  = z.object({
    attributes: z.object({
        items: z.object({
            title: z.string(),
            url: z.string().nullable(),
            image: z.object({
                data: z.object({
                    attributes: z.object({
                        url: z.string()
                    })
                })
            })
        }).array()
    }),
})
export type OrgsT = z.infer<typeof OrgsT>;