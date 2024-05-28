"use client"

import { useSignUp } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';
import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import SubmitButton from './inputs/SubmitButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { VerifyFormT } from '@/lib/types/forms';
import { toast } from 'sonner';
import type { ClerkError } from '../errors/ClerkErrors';
import { SignUpError } from '../errors/ClerkErrors';

export default function VerifyForm({
  setMetadata
}: {
  setMetadata: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { isLoaded, signUp, setActive } = useSignUp();
  // const router = useRouter();

  const form = useForm<z.infer<typeof VerifyFormT>>({
    resolver: zodResolver(VerifyFormT),
    defaultValues: {
      code: ""
    },
    mode: "onChange",
  })

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    const verifyUser = signUp.attemptEmailAddressVerification(form.getValues())
    .then(async (data) => {
      if (data.status === "complete") {
        await setActive({ session: data.createdSessionId });
        return data
      } else {
        return data
      }
    });

    toast.promise(verifyUser, {
      loading: 'Проверяем пользователя...',
      success: () => {
        setMetadata(true)
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
        onSubmit={handleVerify}
        className="space-y-3 flex flex-col w-full"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP 
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  containerClassName='justify-center'
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                {/* Введите код верификации, отправленный на Вашу почту 
                {isLoaded && (
                  <span className='font-medium'>{`(${signUp.emailAddress})`}</span>
                )} */}
              </FormDescription>
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
          Продолжить
        </SubmitButton>
      </form>
    </Form>
  )
}
