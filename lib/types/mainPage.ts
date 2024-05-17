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

export const DirectionsT = z.object({
    attributes: z.object({
        title: z.string(),
        items: z.object({
            title: z.string(),
        }).array()
    }),
})
export type DirectionsT = z.infer<typeof DirectionsT>;

export const ProgrammT = z.object({
    attributes: z.object({
        title: z.string(),
        items: z.object({
            day: z.string(),
            times: z.object({
                title: z.string(),
                time: z.string()
            }).array()
        }).array(),
        description: z.any()
    }),
})
export type ProgrammT = z.infer<typeof ProgrammT>;

export const PlaceT = z.object({
    attributes: z.object({
        title: z.string(),
        address: z.string(),
        description: z.any(),
        additionalLinks: z.object({
            title: z.string(),
            image: z.object({
                data: z.object({
                    attributes: z.object({
                        url: z.string()
                    })
                })
            }),
            description: z.string().nullable(),
            page: z.object({
                data: z.object({
                    attributes: z.object({
                        slug: z.string()
                    })
                }).nullable()
            })
        }).array(),
    }),
})
export type PlaceT = z.infer<typeof PlaceT>;

export const MaterialsT = z.object({
    attributes: z.object({
        items: z.object({
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
        }).array()
    }),
})
export type MaterialsT = z.infer<typeof MaterialsT>;