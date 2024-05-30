import React from 'react'
import { TypographyH3 } from '@/components/typography';
import { redirect } from 'next/navigation';
import type { MetadataFormT } from '@/lib/types/forms';

export default function Fee({
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
      <TypographyH3 className='lg:text-2xl md:text-xl text-lg'>Организационный взнос</TypographyH3>
      <p className='font-medium text-muted-foreground lg:text-lg md:text-base text-sm'>
        
      </p>
      <div className='mt-8'>
      </div>
    </div>
  )
}