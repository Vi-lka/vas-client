"use client"

import React, { useTransition } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EmailContentNotificationTemplate from '@/components/emails/EmailContentNotificationTemplate';
import { render } from '@react-email/render';
import { TypographyH4 } from '@/components/typography';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { ContentNotificationFormT } from '@/lib/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Form } from '@/components/ui/form';
import SubmitButton from '../inputs/SubmitButton';
import { toast } from 'sonner';
import { sendEmailNotification } from '@/app/actions';
import AuthError from '@/components/errors/AuthError';

const EditorComponent = dynamic(() => import('@/components/EditorComponent'), { 
  ssr: false,
  loading: () => <Loader2 className='animate-spin w-8 h-8 mx-auto' />,
})


export default function EmailForm() {
  const router = useRouter()

  const [isPendingTransition, startTransition] = useTransition();
  
  const [isPending, setPending] = React.useState(false);

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof ContentNotificationFormT>>({
    resolver: zodResolver(ContentNotificationFormT), 
    defaultValues: {
      text: ""
    },
    mode: "onChange",
  })

  const onChange = ((markdown: string) => {
    startTransition(() => {
      form.setValue("text", markdown, {shouldDirty: true, shouldValidate: true})
    })
  })

  const emailPreview = isPendingTransition
  ? "Loading..."
  : render(EmailContentNotificationTemplate({text: form.getValues("text")}))

  const handleEmailContentNotification = () => {
    if (!session?.strapiToken) {
      toast.error("Вы не авторизированы")
    } else {
      setPending(true)
  
      const { text } = form.getValues()
  
      const emailsStatus = sendEmailNotification({
        token: session?.strapiToken,
        text,
      })
  
      toast.promise(emailsStatus, {
        loading: 'Отправляем письма...',
        success: () => {
          setPending(false)
          form.reset({
            text
          });
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
  }

  return (
    <div className='w-full flex xl:flex-row flex-col gap-3 justify-center'>
      <Card className='h-fit mb-3'>
        <CardHeader>
          <CardTitle>Отправить Email</CardTitle>
          <CardDescription>
            Отправить Email всем пользователям, подписанным на рассылку об изменениях в Контенте. 
            <br/>
            <span className='text-xs'>Email Уведомления (Контент)</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form 
              action={handleEmailContentNotification}
              className="sm:space-x-3 flex flex-col gap-6 items-center w-full"
            >
              <div className='w-full flex flex-col justify-between lg:gap-3 gap-2'>
                <EditorComponent markdown={""} onChange={onChange} />
              </div>
                
              <SubmitButton 
                disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting || isPending || isPendingTransition}
                className='sm:px-12 px-6 mx-auto md:!mt-0'
              >
                Отправить
              </SubmitButton>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex flex-col'>
          <p className='text-muted-foreground text-xs text-center'>Напишите вкратце об изменениях в контенте.</p>
        </CardFooter>
      </Card>
      <div className='w-full max-w-[600px]'>
        <TypographyH4 className='text-center'>Превью:</TypographyH4>
        {isPendingTransition 
          ? <div className='w-full h-full flex justify-center items-center'><Loader2 className='animate-spin w-8 h-8 mx-auto' /></div>
          : <div dangerouslySetInnerHTML={{ __html: emailPreview }} />
        }
      </div>
    </div>
  )
}
