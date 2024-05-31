"use client"

import React from 'react'
import { Form } from '../ui/form'
import SubmitButton from './inputs/SubmitButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { MetadataFormT } from '@/lib/types/forms'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import AuthError from '../errors/AuthError'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import MetadataNoReport from "./MetadataNoReport"
import MetadataReport from './MetadataReport'
import { updateUserAction } from '@/app/actions'
import { useSession } from 'next-auth/react'
import { usePutObjects } from '@/lib/strapiUpload'
import { Progress } from '../ui/progress'

export default function MetadataForm({
  defaultValues,
  defaultFileUrl,
  defaultTab = "report",
}: {
  defaultValues?: MetadataFormT,
  defaultFileUrl?: string,
  defaultTab?: "report" | "no-report",
}) {

  const router = useRouter()
  const [isPending, setPending] = React.useState(false);
  const { update, data: session } = useSession();

  const form = useForm<z.infer<typeof MetadataFormT>>({
    resolver: zodResolver(MetadataFormT), 
    defaultValues: defaultValues ?? {
      report: defaultTab === "report" ? true : false,
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
      reportFile: {
        file: null,
        url: defaultFileUrl ? defaultFileUrl : "",
      },
      invitation: undefined,
      tables: [],
      tour: "",
      comment: "",
    },
    mode: "onChange",
  })

  const { upload, progress, isLoading } = usePutObjects();

  const handleUpdateUser = () => {
    const userId = session?.user.strapiUserId

    if (!userId) {
      toast.error("Вы не авторизированы")
    } else {
      setPending(true)

      const username = form.getValues("familyName") + " " + form.getValues("name") + " " + form.getValues("middleName")
  
      const { reportFile, ...formData } = form.getValues()
  
      let updateUser: Promise<void>
  
      if (form.getValues("report") === true && reportFile && reportFile.file) {
  
        // Upload file
        updateUser = upload(userId.toString(), reportFile.file)
        .then(() => {
          return updateUserAction({
            username: username,
            subscribed: true,
            report: form.getValues("report"),
            metadata: formData,
          })
        })
        .then(async (data) => {
          // update NextAuth token
          await update({ username: data.username, report: data.report });
        })
  
      } else {
        updateUser = updateUserAction({
          username: username,
          subscribed: true,
          report: form.getValues("report"),
          metadata: formData,
        })
        .then(async (data) => {
          // update NextAuth token
          await update({ username: data.username, report: data.report });
        })
      }
  
      toast.promise(updateUser, {
        loading: 'Сохраняем данные...',
        success: () => {
          setPending(false)
          // refresh server components
          router.refresh();
          router.push('/account');
          return `Успешно!`;
        },
        error: (err) => {
          setPending(false)
          return <AuthError data={err as Error} />
        }
      });
    }
  };

  return (
    <Form {...form}>
      <form 
        action={handleUpdateUser}
        className="space-y-3 flex flex-col w-full"
      >
        <Tabs 
          defaultValue={defaultTab} 
          className="w-full"
        >
          <TabsList className='w-full h-fit flex flex-wrap items-center'>
            <TabsTrigger 
              value="report" 
              disabled={form.formState.isSubmitting || isPending || isLoading} 
              className='px-6'
            >
              С докладом
            </TabsTrigger>
            <TabsTrigger 
              value="no-report"
              disabled={form.formState.isSubmitting || isPending || isLoading} 
              className='px-6'
            >
              Без доклада
            </TabsTrigger>
          </TabsList>

          <TabsContent value="report" className='space-y-3 flex flex-col w-full'>
            <MetadataReport form={form} isPending={isPending || isLoading} defaultFileUrl={defaultFileUrl} />
          </TabsContent>
          <TabsContent value="no-report" className='space-y-3 flex flex-col w-full'>
            <MetadataNoReport form={form} isPending={isPending || isLoading} />
          </TabsContent>
        </Tabs>

        <p className='text-right text-xs text-muted-foreground'>
          <span className='text-destructive font-semibold text-base'>*</span> - Обязательное поле
        </p>

        <SubmitButton 
          disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting || isPending || isLoading}
          className='sm:px-12 px-6 mx-auto md:!mt-0'
        >
          Сохранить
        </SubmitButton>
      </form>
      {(isLoading && (progress > 0)) && (
        <div className='mt-6'>
          <p className='text-center text-sm'>Загружаем файл...</p>
          <Progress value={progress} />
        </div>
      )}
    </Form>
  )
}
