import { z } from "zod";

export const AbstractsT = z.object({
    attributes: z.object({
        text: z.any(),
        file: z.object({
            data: z.object({
                attributes: z.object({
                    url: z.string()
                })
            }).nullable()
        })
    }),
})
export type AbstractsT = z.infer<typeof AbstractsT>;

export const FeeT = z.object({
    attributes: z.object({
        text: z.any(),
    }),
})
export type FeeT = z.infer<typeof FeeT>;