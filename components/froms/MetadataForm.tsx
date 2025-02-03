/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useEffect } from 'react'
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
import { cn } from '@/lib/utils'

export default function MetadataForm({
  defaultValues,
  defaultTab = "report",
  subscribedSwitch,
  fileId,
  imageId
}: {
  defaultValues?: MetadataFormT,
  defaultTab?: "report" | "no-report",
  subscribedSwitch?: boolean;
  fileId: string | undefined,
  imageId: string | undefined,
}) {

  const router = useRouter()

  const [tab, setTab] = React.useState<string>(defaultTab);
  const [isPending, setPending] = React.useState(false);
  const [contentNotifications, setContentNotifications] = React.useState(true);
  const [reportNotifications, setReportNotifications] = React.useState(true);

  const { data: session, update } = useSession();

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
        url: "",
      },
      imageFile: {
        file: null,
        url: "",
      },
      additionalReports: [],
      invitation: undefined,
      tables: [],
      tour: "",
      comment: "",
    },
    mode: "onChange",
  })

  useEffect(() => {
    form.setValue("report", tab === "report" ? true : false, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
  }, [form, tab])

  const { upload: uploadReport, progress: progressReport, isLoading: isLoadingReport } = usePutObjects();
  const { upload: uploadImage, progress: progressImage, isLoading: isLoadingImage } = usePutObjects();

  const handleUpdateUser = () => {
    const userId = session?.user.strapiUserId

    if (!userId) {
      toast.error("Вы не авторизированы")
    } else {
      setPending(true)

      const username = form.getValues("familyName") + " " + form.getValues("name") + " " + form.getValues("middleName")
  
      const { reportFile, imageFile, additionalReports, ...formData } = form.getValues()
  
      let updateUser: Promise<CurrentUserT>
  
      if (form.getValues("report") === true) {
  
        // Upload file
        updateUser = uploadReport(userId.toString(), reportFile?.file, "file")
        .then(async (dataReport) => {
          const dataImage = await uploadImage(userId.toString(), imageFile?.file, "image")
          return { 
            reportUrl: dataReport ? dataReport.data[0].url : "",
            imageUrl: dataImage ? dataImage.data[0].url : "",
          }
        })
        .then(async (dataUpload) => {
          const reportFileUrl = dataUpload.reportUrl.length > 0 
            ? dataUpload.reportUrl 
            : reportFile 
              ? reportFile.url : ""
          const imageFileUrl = dataUpload.imageUrl.length > 0 
            ? dataUpload.imageUrl
            : imageFile 
              ? imageFile.url : ""

          const additionalReportsData = additionalReports ? additionalReports.map(async (item, indx) => {
            const uploadAdditionalReport = await uploadReport(userId.toString(), item.reportFile?.file, "file")
            .then(async (dataAdditionalReport) => {
              const dataAdditionalImage = await uploadImage(userId.toString(), item.imageFile?.file, "image")
              return { 
                reportUrl: dataAdditionalReport ? dataAdditionalReport.data[0].url : "",
                imageUrl: dataAdditionalImage ? dataAdditionalImage.data[0].url : "",
              }
            })
            .then((dataAdditionalUpload) => {
              const additionalReportFileUrl = dataAdditionalUpload.reportUrl.length > 0 
                ? dataAdditionalUpload.reportUrl 
                : (additionalReports && additionalReports[indx] && additionalReports[indx].reportFile)
                  ? additionalReports[indx].reportFile.url : ""
              const additionalImageFileUrl = dataAdditionalUpload.imageUrl.length > 0 
                ? dataAdditionalUpload.imageUrl
                : additionalReports && additionalReports[indx] && additionalReports[indx].imageFile 
                  ? additionalReports[indx].imageFile.url : ""

              return {
                direction: item.direction,
                reportName: item.reportName,
                reportFile: {
                  file: null,
                  url:  additionalReportFileUrl,
                },
                imageFile: {
                  file: null,
                  url: additionalImageFileUrl
                }
              }
            })

            return uploadAdditionalReport
          }) : []

          const additionalReportsDataResult = await Promise.all(additionalReportsData)

          return updateUserAction({
            username: username,
            subscribedContent: subscribedSwitch ? contentNotifications : undefined,
            subscribedReport: subscribedSwitch ? reportNotifications : undefined,
            metadata: {
              ...formData,
              reportFile: {
                file: null,
                url:  reportFileUrl,
              },
              imageFile: {
                file: null,
                url: imageFileUrl
              },
              additionalReports: additionalReportsDataResult
            },
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
          subscribedContent: subscribedSwitch ? contentNotifications : undefined,
          subscribedReport: null,
          metadata: {
            ...formData,
            reportFile: defaultValues?.reportFile,
            imageFile: defaultValues?.imageFile,
          },
        })
        .then(async (data) => {
          // update NextAuth token
          await update({ username: data.username, rezport: data.report });
          return data
        })
      }
  
      toast.promise(updateUser, {
        loading: 'Сохраняем данные...',
        success: (data) => {
          setPending(false)
          form.reset(data.metadata as MetadataFormT);
          // refresh server components
          router.refresh();
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
      <h1 className='text-center'>Изменение данных закрыто</h1>
      {/* <Form {...form}>
        <form 
          action={handleUpdateUser}
          className="space-y-3 flex flex-col w-full"
        >
          <Tabs 
            defaultValue={defaultTab}
            value={tab}
            onValueChange={(value) => setTab(value)}
            className="w-full"
          >
            <TabsList className='w-full h-fit flex flex-wrap items-center'>
              <TabsTrigger 
                value="report" 
                disabled={form.formState.isSubmitting || isPending || isLoadingReport || isLoadingImage} 
                className='px-6'
              >
                С докладом
              </TabsTrigger>
              <TabsTrigger 
                value="no-report"
                disabled={form.formState.isSubmitting || isPending || isLoadingReport || isLoadingImage}
                className='px-6'
              >
                Без доклада
              </TabsTrigger>
            </TabsList>

            <TabsContent 
              forceMount 
              value="report" 
              className={cn(
                'space-y-3 flex flex-col w-full',
                tab === 'report' ? "flex" : "hidden"
              )}
            >
              <MetadataReport
                form={form} 
                isPending={isPending || isLoadingReport || isLoadingImage}
                fileId={fileId}
                imageId={imageId}
              />
            </TabsContent>
            <TabsContent 
              forceMount 
              value="no-report" 
              className={cn(
                'space-y-3 flex flex-col w-full',
                tab === 'no-report' ? "flex" : "hidden"
              )}
            >
              <MetadataNoReport form={form} isPending={isPending || isLoadingReport || isLoadingImage} />
            </TabsContent>
          </Tabs>

          <p className='text-right text-xs text-muted-foreground'>
            <span className='text-destructive font-semibold text-base'>*</span> - Обязательное поле
          </p>

          {subscribedSwitch && (
            <EmailNotifications 
              showReportSwitch={!!form.getValues("report")}
              content={contentNotifications}
              onContentChange={(cheched) => setContentNotifications(cheched)}
              report={reportNotifications}
              onReportChange={(cheched) => setReportNotifications(cheched)}
            />
          )}

          <SubmitButton 
            disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting || isPending || isLoadingReport || isLoadingImage}
            className='sm:px-12 px-6 mx-auto !mt-6'
          >
            Сохранить
          </SubmitButton>
        </form>
        {(isLoadingReport && (progressReport > 0)) && (
          <div className='mt-6'>
            <p className='text-center text-sm'>Загружаем тезисы...</p>
            <Progress value={progressReport} />
          </div>
        )}
        {(isLoadingImage && (progressImage > 0)) && (
          <div className='mt-6'>
            <p className='text-center text-sm'>Загружаем иллюстрацию...</p>
            <Progress value={progressImage} />
          </div>
        )}
      </Form> */}
    </>
  )
}
