import { TypographyH3 } from '@/components/typography';
import type { MetadataFormT } from '@/lib/types/forms';
import { redirect } from 'next/navigation';
import React from 'react'

export default function ArrivalDeparture({
  metadata
}: {
  metadata: MetadataFormT
}) {

  const hasReport = metadata.report === true

  if (!hasReport) {
    redirect("/account");
  }

  return (
    <div className='w-full'>
      <TypographyH3 className='lg:text-2xl md:text-xl text-lg'>Прибытие и отъезд</TypographyH3>
      <p className='font-medium text-muted-foreground lg:text-lg md:text-base text-sm'>
        
      </p>
      <div className='mt-8'>
      </div>
    </div>
  )
}