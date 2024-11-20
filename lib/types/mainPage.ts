import { z } from "zod";
import { DynamicZoneT } from "./additionalPage";

export const NotificationT = z.object({
    attributes: z.object({
        title: z.string().nullable(),
        description: z.any()
    })
}).nullable();
export type NotificationT = z.infer<typeof NotificationT>;

export const AboutT  = z.object({
    attributes: z.object({
        text: z.any(),
        content: z.lazy(() => DynamicZoneT).array(),
    }),
})
export type AboutT = z.infer<typeof AboutT>;

export const OrgsItemT = z.object({
    title: z.string(),
    url: z.string().nullable(),
    image: z.object({
        data: z.object({
            attributes: z.object({
                url: z.string()
            })
        })
    })
})
export type OrgsItemT = z.infer<typeof OrgsItemT>;

export const OrgsT  = z.object({
    attributes: z.object({
        main: OrgsItemT.array(),
        support: OrgsItemT.array(),
        partners: OrgsItemT.array(),
        co_organizers: OrgsItemT.array()
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


export const PersonT = z.object({
    title: z.string(),
    description: z.string().nullable(),
    image: z.object({
        data: z.object({
            attributes: z.object({
                url: z.string()
            })
        }).nullable()
    })
})
export type PersonT = z.infer<typeof PersonT>;

export const CommitteeItemT = z.object({
    title: z.string(),
    persons: PersonT.array(),
})
export type CommitteeItemT = z.infer<typeof CommitteeItemT>;

export const CommitteeT = z.object({
    attributes: z.object({
        title: z.string(),
        items: CommitteeItemT.array()
    }),
})
export type CommitteeT = z.infer<typeof CommitteeT>;



export const ContactsItemT = z.object({
    title: z.string().nullable(),
    places: z.object({
        title: z.string().nullable(),
        address: z.string().nullable(),
        link: z.string().nullable(),
    }).array(),
    persons: z.object({
        title: z.string().nullable(),
        description: z.string().nullable(),
        tel: z.string().nullable(),
        email: z.string().nullable(),
    }).array(),
})
export type ContactsItemT = z.infer<typeof ContactsItemT>;

export const ContactsT = z.object({
    attributes: z.object({
        items: ContactsItemT.array()
    }),
})
export type ContactsT = z.infer<typeof ContactsT>;