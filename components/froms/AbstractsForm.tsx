"use client"

import { usePutObjects } from '@/lib/strapiUpload';
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

export default function AbstractsForm({
  defaultFileUrl,
  defaultImageUrl
}: {
  defaultFileUrl: string | undefined,
  defaultImageUrl: string | undefined,
}) {
  const router = useRouter()
  const [isPending, setPending] = React.useState(false);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof AbstractsFormT>>({
    resolver: zodResolver(AbstractsFormT), 
    defaultValues: {
      reportFile: {
        file: null,
        url: defaultFileUrl ? defaultFileUrl : "",
      },
      imageFile: {
        file: null,
        url: defaultImageUrl ? defaultImageUrl : "",
      },
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
  
      const { reportFile, imageFile } = form.getValues()

      // Upload file
      const updateUser = uploadFile(userId.toString(), reportFile?.file, "file")
      .then(async () => {
        await uploadImage(userId.toString(), imageFile?.file, "image")
      })
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
        className="sm:space-x-3 flex flex-col gap-6 items-center w-full"
      >
        <FormField
          control={form.control}
          name="reportFile"
          render={({ field }) => (
            <FormItem className='w-full mx-auto text-center'>
              <FormLabel className='lg:text-lg text-base'>Ваши материалы для публикации:</FormLabel>
              <FormControl>
                <DropzoneFile
                  isImage={false}
                  formValue={field.value ? field.value : {
                    file: null,
                    url: defaultFileUrl ? defaultFileUrl : "",
                  }}
                  formValueName={field.name}
                  accept={{
                    "application/msword": [".doc", ".docx", ".DOC", ".DOCX"],
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".doc", ".docx", ".DOC", ".DOCX"] 
                  }}
                  maxSize={5 * 1024 * 1024} // 5Mb
                  disabled={form.formState.isSubmitting || isPending}
                  className="min-h-32 bg-background rounded-lg border-dashed border border-primary/50 shadow hover:bg-secondary transition-all outline outline-1 outline-border outline-offset-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageFile"
          render={({ field }) => (
            <FormItem className='w-full mx-auto text-center'>
              <FormLabel className='lg:text-lg text-base'>Иллюстрация:</FormLabel>
              <FormControl>
                <DropzoneFile
                  isImage
                  formValue={field.value ? field.value : {
                    file: null,
                    url: defaultImageUrl ? defaultImageUrl : "",
                  }}
                  formValueName={field.name}
                  accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
                  maxSize={10 * 1024 * 1024} // 10Mb
                  disabled={form.formState.isSubmitting || isPending}
                  className="min-h-32 bg-background rounded-lg border-dashed border border-primary/50 shadow hover:bg-secondary transition-all outline outline-1 outline-border outline-offset-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton 
          disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting || isPending || isLoadingFile || isLoadingImage}
          className='sm:px-12 px-6 mx-auto md:!mt-0'
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
  )
}
