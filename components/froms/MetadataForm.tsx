"use client"

import React from 'react'
import { Form } from '../ui/form'
import SubmitButton from './inputs/SubmitButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { MetadataFormT } from '@/lib/types/forms'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import type { ClerkError } from '../errors/ClerkErrors';
import { SignUpError } from '../errors/ClerkErrors'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import MetadataNoReport from "./MetadataNoReport"
import MetadataReport from './MetadataReport'

export default function MetadataForm() {

  const router = useRouter()
  const { user } = useUser();
  const [hasReport, setHasReport] = React.useState("report");

  const form = useForm<z.infer<typeof MetadataFormT>>({
    resolver: zodResolver(MetadataFormT), 
    defaultValues: {
      report: true,
      familyName: "",
      name: "",
      middleName: "",
      phone: "",
      country: "",
      city: "",
      degree: "",
      rank: "",
      organization: "",
      post: "",
      format: "очно",
      direction: "",
      reportName: "",
      invitation: undefined,
      hotel: undefined,
      tables: [],
      tour: "",
      comment: "",
    },
    mode: "onChange",
  })

  const handleMetadata = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const updateUser = user.update({
      firstName: form.getValues("name"),
      lastName: form.getValues("familyName"),
      unsafeMetadata: form.getValues() 
    })

    toast.promise(updateUser, {
      loading: 'Сохраняем данные...',
      success: () => {
        router.push('/user');
        return `Успешно!`;
      },
      error: (err) => {
        console.error(JSON.stringify(err, null, 2));
        return <SignUpError data={err as ClerkError} />
      }
    });
  };

  const handleChangeTab = (value: string) => {
    setHasReport(value)
    if (value === "no-report") form.setValue("report", false, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
    if (value === "report") form.setValue("report", true, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={handleMetadata}
        className="space-y-3 flex flex-col w-full"
      >
        <Tabs 
          defaultValue="report" 
          value={hasReport}
          onValueChange={handleChangeTab}
          className="w-full"
        >
          <TabsList className='w-full h-fit flex flex-wrap items-center'>
            <TabsTrigger value="report" className='px-6'>С докладом</TabsTrigger>
            <TabsTrigger value="no-report" className='px-6'>Без доклада</TabsTrigger>
          </TabsList>

          <TabsContent value="report" className='space-y-3 flex flex-col w-full'>
            <MetadataReport form={form} />
          </TabsContent>
          <TabsContent value="no-report" className='space-y-3 flex flex-col w-full'>
            <MetadataNoReport form={form} />
          </TabsContent>
        </Tabs>

        <p className='text-right text-xs text-muted-foreground'>
          <span className='text-destructive font-semibold text-base'>*</span> - Обязательное поле
        </p>

        <SubmitButton 
          disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting}
          className='sm:px-12 px-6 mx-auto md:!mt-0'
        >
          Сохранить
        </SubmitButton>
      </form>
    </Form>
  )
}
