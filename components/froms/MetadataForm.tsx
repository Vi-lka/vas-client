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
import EmailNotifications from './EmailNotifications'
import type { CurrentUserT } from '@/lib/types/users'

export default function MetadataForm({
  defaultValues,
  defaultFileUrl,
  defaultImageUrl,
  defaultTab = "report",
  subscribedSwitch,
}: {
  defaultValues?: MetadataFormT,
  defaultFileUrl?: string,
  defaultImageUrl?: string,
  defaultTab?: "report" | "no-report",
  subscribedSwitch?: boolean;
}) {

  const router = useRouter()
  const [isPending, setPending] = React.useState(false);
  const [contentNotifications, setContentNotifications] = React.useState(false);
  const [reportNotifications, setReportNotifications] = React.useState(true);

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
      imageFile: {
        file: null,
        url: defaultImageUrl ? defaultImageUrl : "",
      },
      invitation: undefined,
      tables: [],
      tour: "",
      comment: "",
    },
    mode: "onChange",
  })

  const { upload: uploadFile, progress: progressFile, isLoading: isLoadingFile } = usePutObjects();
  const { upload: uploadImage, progress: progressImage, isLoading: isLoadingImage } = usePutObjects();

  const handleUpdateUser = () => {
    const userId = session?.user.strapiUserId

    if (!userId) {
      toast.error("Вы не авторизированы")
    } else {
      setPending(true)

      const username = form.getValues("familyName") + " " + form.getValues("name") + " " + form.getValues("middleName")
  
      const { reportFile, imageFile, ...formData } = form.getValues()
  
      let updateUser: Promise<CurrentUserT>
  
      if (form.getValues("report") === true) {
  
        // Upload file
        updateUser = uploadFile(userId.toString(), reportFile?.file, "file")
        .then(async (data) => {
          console.log(data?.data[0].url)
          await uploadImage(userId.toString(), imageFile?.file, "image")
        })
        .then(() => {
          return updateUserAction({
            username: username,
            subscribedContent: subscribedSwitch ? contentNotifications : null,
            subscribedReport: subscribedSwitch ? reportNotifications : null,
            metadata: formData,
          })
        })
        .then(async (data) => {
          // update NextAuth token
          await update({ username: data.username, report: data.report });
          return data
        })
  
      } else {
        updateUser = updateUserAction({
          username: username,
          subscribedContent: subscribedSwitch ? contentNotifications : null,
          subscribedReport: null,
          metadata: formData,
        })
        .then(async (data) => {
          // update NextAuth token
          await update({ username: data.username, report: data.report });
          return data
        })
      }
  
      toast.promise(updateUser, {
        loading: 'Сохраняем данные...',
        success: (data) => {
          setPending(false)
          // refresh server components
          router.refresh();
          form.reset(data.metadata as MetadataFormT);
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
    <>
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
                disabled={form.formState.isSubmitting || isPending || isLoadingFile || isLoadingImage} 
                className='px-6'
              >
                С докладом
              </TabsTrigger>
              <TabsTrigger 
                value="no-report"
                disabled={form.formState.isSubmitting || isPending || isLoadingFile || isLoadingImage}
                className='px-6'
              >
                Без доклада
              </TabsTrigger>
            </TabsList>

            <TabsContent value="report" className='space-y-3 flex flex-col w-full'>
              <MetadataReport 
                form={form} 
                isPending={isPending || isLoadingFile || isLoadingImage} 
                defaultFileUrl={defaultFileUrl} 
                defaultImageUrl={defaultImageUrl}
              />
            </TabsContent>
            <TabsContent value="no-report" className='space-y-3 flex flex-col w-full'>
              <MetadataNoReport form={form} isPending={isPending || isLoadingFile || isLoadingImage} />
            </TabsContent>
          </Tabs>

          <p className='text-right text-xs text-muted-foreground'>
            <span className='text-destructive font-semibold text-base'>*</span> - Обязательное поле
          </p>

          {subscribedSwitch && (
            <EmailNotifications 
              showReportSwitch={form.getValues("report")}
              content={contentNotifications}
              onContentChange={(cheched) => setContentNotifications(cheched)}
              report={reportNotifications}
              onReportChange={(cheched) => setReportNotifications(cheched)}
            />
          )}

          <SubmitButton 
            disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting || isPending || isLoadingFile || isLoadingImage}
            className='sm:px-12 px-6 mx-auto !mt-6'
          >
            Сохранить
          </SubmitButton>
        </form>
        {(isLoadingFile && (progressFile > 0)) && (
          <div className='mt-6'>
            <p className='text-center text-sm'>Загружаем файл...</p>
            <Progress value={progressFile} />
          </div>
        )}
        {(isLoadingImage && (progressImage > 0)) && (
          <div className='mt-6'>
            <p className='text-center text-sm'>Загружаем иллюстрацию...</p>
            <Progress value={progressImage} />
          </div>
        )}
      </Form>
    </>
  )
}
