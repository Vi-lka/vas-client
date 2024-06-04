import type { FilesCompT } from '@/lib/types/additionalPage'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { DownloadIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import fixDanglingPrefix from "@/lib/fixDanglingPrefix";
import { TypographyH3 } from '../typography'

export default function FilesBlock({
    data,
    className
}: {
    data: FilesCompT,
    className?: string
}) {
    return (
        <div className={cn('w-full', className)}>
            {data.title && (
                <TypographyH3 className='mb-8'>
                    {data.title}
                </TypographyH3>
            )}

            <ul className="flex flex-wrap gap-4 justify-center auto-rows-fr">
              {data.files.map((item, filesIndex) => (
                <li key={filesIndex} className='group lg:w-[calc(33%-1.3rem)] sm:w-[calc(50%-1.3rem)] w-full ring-primary/80 hover:ring ring-offset-2 rounded-xl transition-all duration-300'>
                  <Link href={item.file.data.attributes.url} target="_blank" className='w-full'>
                    <Card className='w-full h-full flex flex-col justify-center overflow-hidden'>
                      <CardHeader className='pb-2'>
                        <CardTitle className='mb-1'>
                          <DownloadIcon className='w-8 h-8 mx-auto group-hover:translate-y-2 transition-all duration-300'/>
                        </CardTitle>
                        <CardDescription className='font-medium text-center text-card-foreground'>{fixDanglingPrefix(item.title)}</CardDescription>
                      </CardHeader>
                      {item.description && (
                        <CardContent className='pt-0 text-center'>
                          <p className='text-xs font-light text-muted-foreground'>{fixDanglingPrefix(item.description)}</p>
                        </CardContent>
                      )}
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
        </div>
    )
}
