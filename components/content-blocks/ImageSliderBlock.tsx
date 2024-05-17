import CarouselComp from '@/components/CarouselComp'
import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import CarouselLoading from '@/components/loadings/CarouselLoading'
import { TypographyH3 } from '@/components/typography'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'
import type { ImageSliderCompT } from '@/lib/types/additionalPage'
import { cn } from '@/lib/utils'
import React from 'react'

export default function ImageSliderBlock({
    data,
    className
}: {
    data: ImageSliderCompT,
    className?: string
}) {
    return (
        <div className={cn('w-full', className)}>
            {data.title && (
                <TypographyH3 className='mb-8'>
                    {data.title}
                </TypographyH3>
            )}

            <ClientHydration fallback={<CarouselLoading className='w-full h-full sm:aspect-[3/2] aspect-square'/>}>
                <CarouselComp className='lg:-ml-8 -ml-4'>
                    {data.images.data.map((item, index) => (
                        <CarouselItem key={index} className='lg:pl-8 pl-4'>
                            <Card className='border-none shadow-md bg-transparent rounded-3xl'>
                                <CardContent className="relative w-full sm:aspect-[3/2] aspect-square">
                                    <ImageComp
                                        src={item.attributes.url}
                                        alt={item.attributes.url}
                                        fill
                                        sizes='(min-width: 1280px) 50vw, (min-width: 1280px) 70vw, 90vw'
                                        className='w-full object-contain rounded-3xl'
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselComp>
            </ClientHydration>
        </div>
    )
}
