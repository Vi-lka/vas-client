"use client"

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NewConfirmRequestFormT } from '@/lib/types/forms';
import type { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Button } from '../../ui/button';
import { InputField } from '../inputs/InputField';
import SubmitButton from '../inputs/SubmitButton';
import { requestPasswordResetAction } from '@/app/actions';
import { toast } from 'sonner';
import AuthError from '../../errors/AuthError';

export default function ForgotPassForm() {
  const [sent, setSent] = useState(false)

  const form = useForm<z.infer<typeof NewConfirmRequestFormT>>({
    resolver: zodResolver(NewConfirmRequestFormT),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  })

  const handleForgotPass = (formData: FormData) => {

    const forgotPass = requestPasswordResetAction(form.getValues())

    toast.promise(forgotPass, {
      loading: 'Отправляем письмо...',
      success: () => {
        setSent(true)
        return `На почту ${formData.get("email")} отправлена ссылка для сброса пароля`;
      },
      error: (err) => {
        return <AuthError data={err as Error} />
      }
    });
  };

  if (sent) return (
    <Card className='relative sm:w-5/6 w-full sm:max-w-md max-w-sm mx-auto mt-20'>
      <CardHeader>
        <CardTitle className='text-center lg:text-2xl text-xl'>Проверьте свой Email</CardTitle>
        <CardDescription className='text-center'>
          Мы отправили вам письмо с ссылкой для сброса пароля.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='text-sm text-left'>
          <h3 className='font-medium text-sm mb-1'>Не нашли письмо?</h3>
          <p className='text-xs text-muted-foreground'>
            Если вы не получили электронное письмо со ссылкой для подтверждения, пожалуйста, проверьте
            папку со спамом или подождите пару минут.
          </p>

          <h3 className='font-medium text-sm mt-3'>
            По-прежнему нет письма?{" "}
            <Button variant="link" className='p-0 m-0' onClick={() => setSent(false)}>
              Запросить новое
            </Button>
          </h3>
        </div>
      </CardContent>
    </Card>
  )
    
  return (
    <Card className='relative sm:w-5/6 w-full sm:max-w-md max-w-sm mx-auto mt-20'>
      <CardHeader>
        <CardTitle className='text-center lg:text-2xl text-xl'>Сброс пароля</CardTitle>
        <CardDescription className='text-center'>
          Забыли свой пароль? Введите адрес электронной почты вашей учетной записи, и мы вышлем вам
          ссылку для сброса пароля.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            action={handleForgotPass}
            className="space-y-3 flex flex-col w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <InputField 
                      placeholder={"example@mail.com"}
                      disabled={form.formState.isSubmitting}
                      autoComplete="email"
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
              className='sm:px-12 px-6 mx-auto !mt-4'
            >
              Отправить
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
