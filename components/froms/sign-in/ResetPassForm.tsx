"use client"

import React, { useState } from 'react'
import AuthError from '@/components/errors/AuthError'
import { PasswordField } from '@/components/froms/inputs/PasswordField';
import SubmitButton from '@/components/froms/inputs/SubmitButton';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PasswordResetFormT } from '@/lib/types/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { resetPasswordAction } from '@/app/actions';
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ResetPassForm({
  searchParams
}: {
  searchParams: {
    code?: string,
  },
}) {
  const [success, setSuccess] = useState(false)

  const form = useForm<z.infer<typeof PasswordResetFormT>>({
    resolver: zodResolver(PasswordResetFormT),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
    mode: "onChange",
  })

  const handleResetPass = () => {

    if (!searchParams.code) {
      toast.error(<AuthError title='Ошибка!' data="Пожалуйста, воспользуйтесь ссылкой, которую мы отправили вам по почте." />)
    } else {
      const forgotPass = resetPasswordAction(form.getValues(), searchParams.code)

      toast.promise(forgotPass, {
        loading: 'Обновляем пароль...',
        success: () => {
          setSuccess(true)
          return `Успешно!`;
        },
        error: (err) => {
          return <AuthError data={err as Error} />
        }
      });
    }
  };

  if (success) return (
    <Card className='relative sm:w-5/6 w-full sm:max-w-md max-w-sm mx-auto mt-20'>
      <CardHeader>
        <CardTitle className='text-center lg:text-2xl text-xl'>Пароль был сброшен</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-center'>
          Ваш пароль был сброшен. Теперь вы можете{' '}
          <Link href="/sign-in" passHref className=''>
            <Button variant="link" className='text-sm font-medium px-0'>
              Войти
            </Button>
          </Link>
          , используя свой новый пароль.
        </p>
      </CardContent>
    </Card>
  )

  if (!searchParams.code) return (
    <Card className='relative sm:w-5/6 w-full sm:max-w-md max-w-sm mx-auto mt-20'>
      <CardHeader>
        <CardTitle className='text-center lg:text-2xl text-xl'>Ошибка!</CardTitle>
        <CardDescription className='text-center'>
          Пожалуйста, воспользуйтесь ссылкой, которую мы отправили вам по почте.
        </CardDescription>
      </CardHeader>
    </Card>
  )

  return (
    <Card className='relative sm:w-5/6 w-full sm:max-w-md max-w-sm mx-auto mt-20'>
      <CardHeader>
        <CardTitle className='text-center lg:text-2xl text-xl'>Сбросьте свой пароль</CardTitle>
        <CardDescription className='text-center'>
          Чтобы сбросить свой пароль, введите новый и подтвердите его повторным вводом.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            action={handleResetPass}
            className="space-y-3 flex flex-col w-full"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <PasswordField
                      placeholder='Введите пароль'
                      disabled={form.formState.isSubmitting}
                      autoComplete="new-password"
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
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подтверждение Пароля</FormLabel>
                  <FormControl>
                    <PasswordField
                      placeholder='Введите пароль снова'
                      disabled={form.formState.isSubmitting}
                      autoComplete="new-password"
                        className='bg-background rounded-lg border-border shadow'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className='text-xs text-center flex flex-wrap justify-center items-center gap-x-1'>
                      Советуем пользоваться
                      <a 
                        href='https://vc.ru/reg-ru/469476-7-menedzherov-paroley-kotorye-ne-ushli-s-nashego-rynka' 
                        target="_blank" 
                        className='text-primary underline-offset-4 hover:underline'
                      >Менеджером паролей</a>
                    </FormDescription>
                  </FormItem>
                )}
            />

            <SubmitButton 
              disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting}
              className='sm:px-12 px-6 mx-auto !mt-4'
            >
              Сбросить
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
