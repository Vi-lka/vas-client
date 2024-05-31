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
  defaultFileUrl
}: {
  defaultFileUrl: string | undefined,
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
  
      const { reportFile } = form.getValues()
  
      if (reportFile && reportFile.file) {
        // Upload file
        const updateUser = upload(userId.toString(), reportFile.file)

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
      } else {
        setPending(false)
      }
    }
  };

  return (
    <Form {...form}>
      <form 
        action={handleUpdateUser}
        className="space-y-3 flex flex-col w-full gap-3"
      >
        <FormField
          control={form.control}
          name="reportFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваши материалы для публикации:</FormLabel>
              <FormControl>
                <DropzoneFile
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
