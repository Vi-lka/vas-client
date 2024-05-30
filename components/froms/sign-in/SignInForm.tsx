"use client"

import { SignInFormT } from '@/lib/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { InputField } from '../inputs/InputField';
import { PasswordField } from '../inputs/PasswordField';
import SubmitButton from '../inputs/SubmitButton';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { translateError } from '@/lib/utils';
import Link from 'next/link'
import { Button } from '@/components/ui/button';

export default function SignInForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof SignInFormT>>({
    resolver: zodResolver(SignInFormT),
    defaultValues: {
      identifier: "",
      password: ""
    },
    mode: "onChange",
  })

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.loading("Проверяем пользователя...", {id: "loading"})
    const signInResponse = await signIn('credentials', {
      ...form.getValues(),
      redirect: false,
    });

    if (signInResponse && !signInResponse?.ok) {
      toast.dismiss("loading")
      toast.error(
        signInResponse.error
        ? translateError(signInResponse.error, signInResponse.error)
        : 'Что-то пошло не так.'
      )
    } else {
      // handle success
      toast.dismiss("loading")
      toast.success("Успешно!")
      router.push("/account");
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSignIn}
        className="space-y-3 flex flex-col w-full"
      >
        <FormField
          control={form.control}
          name="identifier"
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
                  disabled={form.formState.isSubmitting}
                  placeholder='Введите пароль'
                  autoComplete="current-password"
                  className='bg-background rounded-lg border-border shadow'
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription className='text-right'>
                <Link href="/sign-in/forgot" passHref className=''>
                  <Button variant="link" className='text-sm font-medium h-fit px-1 pt-0 m-0'>
                    Забыли пароль?
                  </Button>
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />

        <SubmitButton 
          disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting}
          className='sm:px-12 px-6 mx-auto !mt-6'
        >
          Войти
        </SubmitButton>
      </form>
    </Form>
  )
}
