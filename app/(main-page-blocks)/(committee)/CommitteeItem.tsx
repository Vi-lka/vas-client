import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import { TypographyH2 } from '@/components/typography'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { CommitteeItemT } from '@/lib/types/mainPage'
import { cn } from '@/lib/utils'
import React from 'react'

export default function CommitteeItem({
    data,
    className
}: {
    data: CommitteeItemT,
    className?: string
}) {
    return (
        <div className={cn("mx-auto text-center", className)}>
            <TypographyH2 className="my-4 leading-snug lg:text-3xl text-2xl">
                {data.title}
            </TypographyH2>

            <div className='flex flex-wrap items-center justify-center gap-x-6 sm:gap-y-3 gap-y-4 mt-8'>
                {data.persons.map((item, index) => (
                        <Card key={index} className=' lg:w-[calc(25%-1.5rem)] sm:w-[calc(33%-1.5rem)] min-[460px]:w-[calc(50%-1.5rem)] w-full h-full border-none shadow-none bg-transparent'>
                            <CardContent className="flex flex-col justify-center p-0 h-full relative w-full text-center">
                                {item.image.data && (
                                    <ClientHydration fallback={<Skeleton className='w-28 h-28 aspect-square mx-auto mb-1 rounded-xl' />}>
                                        <ImageComp
                                            src={item.image.data.attributes.url}
                                            alt={item.title}
                                            fill={false}
                                            width={112}
                                            height={112}
                                            className='aspect-square object-cover mx-auto mb-1 rounded-xl'
                                        />
                                    </ClientHydration>
                                )}
                                <h4 className={cn(
                                    "font-bold tracking-tight text-foreground",
                                    item.description ? "lg:text-lg" : "text-base"
                                )}>
                                    {item.title}
                                </h4>
                                {item.description && (
                                    <p className='mt-1 text-sm text-muted-foreground flex-1'>{item.description}</p>
                                )}
                            </CardContent>
                        </Card>
                ))}
            </div>
        </div>
    )
}
