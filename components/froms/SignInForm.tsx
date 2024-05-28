"use client"

import { SignInFormT } from '@/lib/types/forms';
import { useSignIn } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import type { ClerkError } from '../errors/ClerkErrors';
import { SignUpError } from '../errors/ClerkErrors';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { InputField } from './inputs/InputField';
import { PasswordField } from './inputs/PasswordField';
import SubmitButton from './inputs/SubmitButton';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter()

  const form = useForm<z.infer<typeof SignInFormT>>({
    resolver: zodResolver(SignInFormT),
    defaultValues: {
      identifier: "",
      password: ""
    },
    mode: "onChange",
  })

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    const signInUser = signIn.create(form.getValues())
    .then(async (data) => {
      if (data.status === "complete") {
        await setActive({ session: data.createdSessionId });
        return data
      } else {
        return data
      }
    });

    toast.promise(signInUser, {
      loading: 'Проверяем пользователя...',
      success: () => {
        router.push('/account');
        return `Успешно!`;
      },
      error: (err) => {
        return <SignUpError data={err as ClerkError} />
      }
    });
  };

  return (
    <Form {...form}>
      <form
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
            </FormItem>
          )}
        />

        {/* CAPTCHA Widget */}
        <div id="clerk-captcha"></div>

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
