/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { usePutObjects } from '@/lib/strapiUpload';
import type { MetadataFormT } from '@/lib/types/forms';
import { AbstractsFormT } from '@/lib/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import DropzoneFile from './inputs/DropzoneFile';
import SubmitButton from './inputs/SubmitButton';
import { Progress } from '../ui/progress';
import { toast } from 'sonner';
import AuthError from '../errors/AuthError';
import { updateUserAction } from '@/app/actions';
import MetadataReportAdditional from './MetadataReportAdditional';

export default function AbstractsForm({
  metadata,
  fileId,
  imageId
}: {
  metadata: MetadataFormT,
  fileId: string | undefined,
  imageId: string | undefined,
}) {
  const router = useRouter()
  const [isPending, setPending] = React.useState(false);

  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof AbstractsFormT>>({
    resolver: zodResolver(AbstractsFormT), 
    defaultValues: {
      reportFile: metadata.reportFile ? metadata.reportFile 
      : {
          file: null,
          url: ""
        },
      imageFile: metadata.imageFile ? metadata.imageFile 
      : {
          file: null,
          url: ""
        },
      additionalReports: metadata.additionalReports ? metadata.additionalReports
      : [],
    },
    mode: "onChange",
  })

  const { upload: uploadReport, progress: progressReport, isLoading: isLoadingReport } = usePutObjects();
  const { upload: uploadImage, progress: progressImage, isLoading: isLoadingImage } = usePutObjects();

  const handleUpdateUser = () => {
    // const userId = session?.user.strapiUserId

    // if (!userId) {
    //   toast.error("Вы не авторизированы")
    // } else {
    //   setPending(true)
  
    //   const { reportFile, imageFile, additionalReports } = form.getValues()

    //   // Upload file
    //   const updateUser = uploadReport(userId.toString(), reportFile?.file, "file")
    //   .then(async (dataReport) => {
    //     const dataImage = await uploadImage(userId.toString(), imageFile?.file, "image")
    //     return { 
    //       reportUrl: dataReport ? dataReport.data[0].url : "",
    //       imageUrl: dataImage ? dataImage.data[0].url : "",
    //     }
    //   })
    //   .then(async (dataUpload) => {
    //     const reportFileUrl = dataUpload.reportUrl.length > 0 
    //       ? dataUpload.reportUrl 
    //       : reportFile 
    //         ? reportFile.url : ""
    //     const imageFileUrl = dataUpload.imageUrl.length > 0 
    //       ? dataUpload.imageUrl
    //       : imageFile 
    //         ? imageFile.url : ""

    //     const additionalReportsData = additionalReports ? additionalReports.map(async (item, indx) => {
    //       const uploadAdditionalReport = await uploadReport(userId.toString(), item.reportFile?.file, "file")
    //       .then(async (dataAdditionalReport) => {
    //         const dataAdditionalImage = await uploadImage(userId.toString(), item.imageFile?.file, "image")
    //         return { 
    //           reportUrl: dataAdditionalReport ? dataAdditionalReport.data[0].url : "",
    //           imageUrl: dataAdditionalImage ? dataAdditionalImage.data[0].url : "",
    //         }
    //       })
    //       .then((dataAdditionalUpload) => {
    //         const additionalReportFileUrl = dataAdditionalUpload.reportUrl.length > 0 
    //           ? dataAdditionalUpload.reportUrl 
    //           : (metadata && additionalReports && additionalReports[indx] && (additionalReports[indx].reportFile))
    //             ? additionalReports[indx].reportFile.url : ""
    //         const additionalImageFileUrl = dataAdditionalUpload.imageUrl.length > 0 
    //           ? dataAdditionalUpload.imageUrl
    //           : (metadata && additionalReports && additionalReports[indx] && additionalReports[indx].imageFile)
    //             ? additionalReports[indx].imageFile?.url : ""
  
    //         return {
    //           direction: item.direction,
    //           reportName: item.reportName,
    //           reportFile: {
    //             file: null,
    //             url:  additionalReportFileUrl,
    //           },
    //           imageFile: {
    //             file: null,
    //             url: additionalImageFileUrl
    //           }
    //         }
    //       })
  
    //       return uploadAdditionalReport
    //     }) : []
  
    //     const additionalReportsDataResult = await Promise.all(additionalReportsData)

    //     return updateUserAction({
    //       metadata: {
    //         ...metadata,
    //         reportFile: {
    //           file: null,
    //           url:  reportFileUrl,
    //         },
    //         imageFile: {
    //           file: null,
    //           url: imageFileUrl
    //         },
    //         additionalReports: additionalReportsDataResult
    //       },
    //     })
    //   })
    //   .then(async (data) => {
    //     // update NextAuth token
    //     await update({ username: data.username, report: data.report });
    //     return data
    //   })


    //   toast.promise(updateUser, {
    //     loading: 'Сохраняем данные...',
    //     success: (data) => {
    //       const reportUrl = (data.metadata as MetadataFormT).reportFile?.url 
    //       const imageUrl = (data.metadata as MetadataFormT).imageFile?.url
    //       const additionalReports = (data.metadata as MetadataFormT).additionalReports

    //       setPending(false)
    //       form.reset({
    //         reportFile: {
    //           file: null,
    //           url: reportUrl ?? ""
    //         },
    //         imageFile: {
    //           file: null,
    //           url: imageUrl ?? ""
    //         },
    //         additionalReports
    //       });
    //       // refresh server components
    //       router.refresh();
    //       return `Успешно!`;
    //     },
    //     error: (err) => {
    //       setPending(false)
    //       return <AuthError data={err as Error} />
    //     }
    //   });
    // }
    toast("Изменение данных закрыто")
  };

  return (
    <>
    <h1 className='text-center mb-6'>Изменение данных закрыто</h1>
    <Form {...form}>
      <form 
        action={handleUpdateUser}
        className="sm:space-x-3 flex flex-col gap-6 items-center w-full"
      >
        <div className='w-full flex lg:flex-row flex-col justify-between lg:gap-3 gap-2'>
          <div className='lg:w-1/2 w-full'>
            <FormField
              control={form.control}
              name="reportFile"
              render={({ field }) => (
                <FormItem className='w-full mx-auto text-center'>
                  <FormLabel>Тезисы:</FormLabel>
                  <FormControl>
                    <DropzoneFile
                      id={fileId}
                      isImage={false}
                      formValue={field.value}
                      formValueName={field.name}
                      accept={{
                        "application/msword": [".doc", ".docx", ".DOC", ".DOCX"],
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".doc", ".docx", ".DOC", ".DOCX"] 
                      }}
                      maxSize={5 * 1024 * 1024} // 5Mb
                      // disabled={form.formState.isSubmitting || isPending}
                      disabled
                      className="min-h-32 bg-background rounded-lg border-dashed border border-primary/50 shadow hover:bg-secondary transition-all outline outline-1 outline-border outline-offset-2"
                    >
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        DOC, DOCX (Max 5Mb)
                      </p>
                    </DropzoneFile>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='lg:w-1/2 w-full'>
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field }) => (
                <FormItem className='w-full mx-auto text-center'>
                  <FormLabel>Иллюстрация:</FormLabel>
                  <FormControl>
                    <DropzoneFile
                      id={imageId}
                      isImage
                      formValue={field.value}
                      formValueName={field.name}
                      accept={{
                        'image/jpg': [],
                        'image/jpeg': [],
                        'image/png': [],
                      }}
                      maxSize={20 * 1024 * 1024} // 20Mb
                      // disabled={form.formState.isSubmitting || isPending}
                      disabled
                      className="min-h-32 bg-background rounded-lg border-dashed border border-primary/50 shadow hover:bg-secondary transition-all outline outline-1 outline-border outline-offset-2"
                    >
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        JPEG, JPG, PNG (Max 20Mb)
                      </p>
                    </DropzoneFile>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <MetadataReportAdditional isPending={isPending} />

        {/* <SubmitButton 
          disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting || isPending || isLoadingReport || isLoadingImage}
          className='sm:px-12 px-6 mx-auto md:!mt-0'
        >
          Сохранить
        </SubmitButton> */}
      </form>
      {(isLoadingReport && (progressReport > 0)) && (
        <div className='mt-6'>
          <p className='text-center text-sm'>Загружаем файл...</p>
          <Progress value={progressReport} />
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
