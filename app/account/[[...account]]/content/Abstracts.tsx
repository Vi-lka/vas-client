import { TypographyH3 } from '@/components/typography'
import type { MetadataFormT } from '@/lib/types/forms'
import type { User } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default function Abstracts({
  user
}: {
  user: User
}) {

  const userMetadata = (user.unsafeMetadata as MetadataFormT)

  const hasReport = userMetadata.report === true

  if (!hasReport) {
    redirect("/account");
  }

  return (
    <div className='w-full'>
      <TypographyH3 className='lg:text-2xl md:text-xl text-lg'>Тезисы</TypographyH3>
      <p className='font-medium text-muted-foreground lg:text-lg md:text-base text-sm'>
        Ознакомьтесь с требованиями к тезисам и отправьте свои
      </p>
      <div className='mt-8'>
      </div>
    </div>
  )
}
