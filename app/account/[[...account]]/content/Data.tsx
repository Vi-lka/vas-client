import MetadataForm from '@/components/froms/MetadataForm'
import { TypographyH3 } from '@/components/typography'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { MetadataFormT } from '@/lib/types/forms'
import type { User } from '@clerk/nextjs/server'
import React from 'react'

export default function Data({
  user
}: {
  user: User
}) {

  const userMetadata = (user.unsafeMetadata as MetadataFormT)

  const hasReport = userMetadata.report === true

  return (
    <div className='w-full'>
      <TypographyH3 className='lg:text-2xl md:text-xl text-lg'>Заявка</TypographyH3>
      <p className='font-medium text-muted-foreground lg:text-lg md:text-base text-sm'>
        {hasReport ? "Вы зарегистрированы с докладом" : "Вы зарегистрированы без доклада (слушатель)"}
      </p>
      <div className='mt-8'>
        <Card className='w-full sm:max-w-3xl max-w-md mx-auto'>
          <CardHeader>
            <CardTitle className='text-center lg:text-2xl text-xl whitespace-pre-wrap'>Редактировать данные</CardTitle>
            <CardDescription className='text-center'>
              Выберите как вы хотите участвовать:
              <br/> 
              <span className='font-semibold'>с докладом</span> или <span className='font-semibold'>без (слушатель) </span>
              и заполните данные
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MetadataForm defaultValues={userMetadata} defaultTab={hasReport ? "report" : "no-report"} />
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
