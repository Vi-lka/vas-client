"use client"

import { signUpAction } from '@/app/actions';
import AuthError from '@/components/errors/AuthError'
import { InputField } from '@/components/froms/inputs/InputField'
import { PasswordField } from '@/components/froms/inputs/PasswordField';
import SubmitButton from '@/components/froms/inputs/SubmitButton';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { SignUpFormT } from '@/lib/types/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export default function SignUpForm() {

  const router = useRouter()

  const form = useForm<z.infer<typeof SignUpFormT>>({
    resolver: zodResolver(SignUpFormT),
    defaultValues: {
      emailAddress: "",
      password: ""
    },
    mode: "onChange",
  })

  const handleSignUp = (formData: FormData) => {

    const createUser = signUpAction(form.getValues())

    toast.promise(createUser, {
      loading: 'Создаем пользователя...',
      success: () => {
        router.push("/sign-up/confirmation")
        return `На почту ${formData.get("emailAddress")} отправлена ссылка для подтверждения`;
      },
      error: (err) => {
        return <AuthError data={err as Error} />
      }
    });
  };
  
  return (
    <Form {...form}>
      <form 
        action={handleSignUp}
        className="space-y-3 flex flex-col w-full"
      >
        <FormField
          control={form.control}
          name="emailAddress"
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
          Продолжить
        </SubmitButton>
      </form>
    </Form>
  )
}
