"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { StatusFormT } from '@/lib/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import type { StatusTranslitEnum } from '@/lib/types/users';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import SubmitButton from '@/components/froms/inputs/SubmitButton';
import { TextareaField } from '../inputs/TextareaField';
import { SelectField } from '../inputs/SelectField';
import { updateStatusAction } from '@/app/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import AuthError from '@/components/errors/AuthError';

export default function StatusForm({
  userId,
  defaultStatus,
  defaultComment
}: {
  userId: string,
  defaultStatus: StatusTranslitEnum | null,
  defaultComment: string | null
}) {

  const router = useRouter()
  
  const [isPending, setPending] = React.useState(false);

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof StatusFormT>>({
    resolver: zodResolver(StatusFormT), 
    defaultValues: {
      status: defaultStatus ?? undefined,
      statusComment: defaultComment ?? undefined
    },
    mode: "onChange",
  })

  const handleUpdateStatus = () => {
    if (!session?.strapiToken) {
      toast.error("Вы не авторизированы")
    } else {
      setPending(true)
  
      const { status, statusComment } = form.getValues()
  
      const updateStatus = updateStatusAction({
        token: session?.strapiToken,
        userId,
        status,
        statusComment
      })
  
      toast.promise(updateStatus, {
        loading: 'Сохраняем данные...',
        success: (data) => {
          setPending(false)
          form.reset({
            status: data.attributes.status,
            statusComment: data.attributes.statusComment ?? undefined
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
    <Card>
      <CardHeader>
        <CardTitle>Статус заявки</CardTitle>
        <CardDescription>
          <span>Поменять статус заявки и оставить комментарий для пользователя</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form 
            action={handleUpdateStatus}
            className="sm:space-x-3 flex flex-col gap-6 items-center w-full"
          >
            <div className='w-full flex flex-col justify-between lg:gap-3 gap-2'>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Статус заявки</FormLabel>
                    <FormControl>
                      <SelectField
                        data={[
                          {value: "poluchena", label: "получена"},
                          {value: "odobrena", label: "одобрена"},
                          {value: "na_dorabotke", label: "на доработке"},
                        ]}
                        disabled={form.formState.isSubmitting || isPending}
                        placeholder="Выберите Статус заявки"
                        className='w-full bg-background rounded-lg border-border shadow'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="statusComment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Комментарий</FormLabel>
                    <FormControl>
                      <TextareaField
                        placeholder={"Напишите комментарий почему такой статус..."}
                        disabled={form.formState.isSubmitting}
                        className='w-full min-h-20 bg-background rounded-lg border-border shadow'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SubmitButton 
              disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting || isPending}
              className='sm:px-12 px-6 mx-auto md:!mt-0'
            >
              Сохранить
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex flex-col'>
        <p className='text-muted-foreground text-xs text-center'>Пользователю придет письмо на почту.</p>
      </CardFooter>
    </Card>
  )
}
