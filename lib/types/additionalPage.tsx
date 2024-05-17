import { z } from "zod";

export const TextCompT = z.object({
    __typename: z.literal("ComponentContentTextBlock"),
    title: z.string().nullable(),
    text: z.any(),
})
export type TextCompT = z.infer<typeof TextCompT>;


export const ImageSliderCompT = z.object({
    __typename: z.literal("ComponentContentImageSlider"),
    title: z.string().nullable(),
    images: z.object({
        data: z.object({
            attributes: z.object({
                url: z.string()
            })
        }).array()
    })
})
export type ImageSliderCompT = z.infer<typeof ImageSliderCompT>;

export const FilesCompT = z.object({
    __typename: z.literal("ComponentContentFiles"),
    title: z.string().nullable(),
    files: z.object({
        title: z.string(),
        description: z.string().nullable(),
        file: z.object({
            data: z.object({
                attributes: z.object({
                    url: z.string()
                })
            })
        })
    }).array()
})
export type FilesCompT = z.infer<typeof FilesCompT>;

//..................................................DynamicZone..................................................//
export const DynamicZoneT = z.discriminatedUnion("__typename", [
    TextCompT,
    ImageSliderCompT,
    FilesCompT,
])
export type DynamicZoneT = z.infer<typeof DynamicZoneT>;




export const AdditionalPageT = z.object({
    attributes: z.object({
        title: z.string(),
        slug: z.string(),
        content: DynamicZoneT.array()
    }),
})
export type AdditionalPageT = z.infer<typeof AdditionalPageT>;