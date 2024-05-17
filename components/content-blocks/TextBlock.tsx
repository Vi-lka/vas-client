import type { TextCompT } from '@/lib/types/additionalPage'
import React from 'react'
import { TypographyH3 } from '../typography'
import { cn } from '@/lib/utils'
import BlocksRendererStrapi from './BlocksRendererStrapi'

export default function TextBlock({ 
    data,
    className
}: { 
    data: TextCompT,
    className?: string
}) {
    return (
        <div className={cn('w-full', className)}>
            {data.title && (
                <TypographyH3 className='mb-8'>
                    {data.title}
                </TypographyH3>
            )}

            <div className=''>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                <BlocksRendererStrapi content={data.text} />
            </div>
        </div>
    )
}
