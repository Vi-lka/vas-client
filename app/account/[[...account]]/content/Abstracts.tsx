import AbstractsForm from '@/components/froms/AbstractsForm'
import { TypographyH3 } from '@/components/typography'
import type { MetadataFormT } from '@/lib/types/forms'
import type { StatusEnum } from '@/lib/types/users'
import { redirect } from 'next/navigation'
import React from 'react'

export default function Abstracts({
  metadata,
  status,
  fileUrl,
}: {
  metadata: MetadataFormT,
  status: StatusEnum | null,
  fileUrl?: string,
}) {

  const hasReport = metadata.report === true

  if (!hasReport) {
    redirect("/account");
  }

  return (
    <div className='w-full'>
      <div className=' flex lg:flex-row flex-col justify-between gap-3'>
        <div className=''>
          <TypographyH3 className='lg:text-2xl md:text-xl text-lg'>Тезисы</TypographyH3>
          <p className='font-medium text-muted-foreground lg:text-lg md:text-base text-sm'>
            Ознакомьтесь с требованиями к тезисам и отправьте свои
          </p>
        </div>
        {status && (
          <p className=''>
            Статус заявки: <span className='font-medium'>{status}</span>
          </p>
        )}
      </div>
      <div className='mt-8 w-full sm:max-w-3xl max-w-md mx-auto'>
        <AbstractsForm defaultFileUrl={fileUrl}/>
      </div>
    </div>
  )
}
