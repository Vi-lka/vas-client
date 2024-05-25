"use client"

import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { cn, getShortText } from '@/lib/utils'
import { useToast } from '../ui/use-toast'
import { useFormState } from 'react-dom'
import { sendEmail } from '@/app/actions'
import { useForm } from 'react-hook-form'
import { ContactFormT } from '@/lib/types/forms'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { InputField } from '../froms/inputs/InputField'
import { TextareaField } from '../froms/inputs/TextareaField'
import SubmitButton from '../froms/inputs/SubmitButton'
import type { z } from 'zod'


export default function FormFooter({
  className
}: {
  className?: string
}) {

  const { toast } = useToast();

  const form = useForm<z.infer<typeof ContactFormT>>({
    resolver: zodResolver(ContactFormT),
    defaultValues: {
      username: "",
      email: "",
      text: ""
    },
    mode: 'onBlur',
  })

  const [sendEmailState, sendEmailAction] = useFormState(sendEmail, {
    error: null,
    success: false
  })

  useEffect(() => {
    if (sendEmailState.success) {
      toast({
        title: "Успешно!",
        description: "Сообщение отправлено",
        className: "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      });
      form.reset()
    }
    if (sendEmailState.error) {
      toast({
        variant: "destructive",
        title: "Ошибка!",
        description: <p>{getShortText(sendEmailState.error, 50)}</p>,
        className: "font-Inter",
      });
    }
  }, [form, sendEmailState, toast])

  const handleAction = (formData: FormData) => {
    sendEmailAction({
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      text: formData.get("text") as string
    })
  }

  return (
    <Card className={cn("shadow-none border-none", className)} >
      <CardHeader className='pt-0 pb-3 space-y-0'>
        <CardTitle className='text-2xl sm:text-left text-center'>
          Обратная связь
        </CardTitle>
        <CardDescription className='sm:text-base sm:text-left text-center'>
          Свяжитесь с нами если возникли вопросы
        </CardDescription>
      </CardHeader>
      <CardContent className='!w-full'>
        <Form {...form}>
          <form 
            action={handleAction}
            className="space-y-3 flex flex-col w-full"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputField 
                      placeholder={"ФИО"}
                      disabled={form.formState.isSubmitting}
                      className='bg-background rounded-lg border-border shadow'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputField 
                      placeholder={"Email"}
                      disabled={form.formState.isSubmitting}
                      className='bg-background rounded-lg border-border shadow'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextareaField
                      placeholder={"Текст"}
                      disabled={form.formState.isSubmitting}
                      className='bg-background rounded-lg border-border shadow'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton 
              disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting}
              className='px-8 lg:ml-0 mx-auto'
            >
              Отправить
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
