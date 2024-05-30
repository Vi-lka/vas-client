"use client"

import { NewConfirmRequestFormT } from '@/lib/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { InputField } from '../inputs/InputField';
import SubmitButton from '../inputs/SubmitButton';
import { toast } from 'sonner';
import AuthError from '../../errors/AuthError';
import { confirmationNewRequestAction } from '@/app/actions';

export default function NewConfirmRequestForm({
  setNewConfirmRequest
}: {
  setNewConfirmRequest: React.Dispatch<React.SetStateAction<boolean>>
}) {

  const form = useForm<z.infer<typeof NewConfirmRequestFormT>>({
    resolver: zodResolver(NewConfirmRequestFormT),
    defaultValues: {
      email: ""
    },
    mode: "onChange",
  })

  const handleNewRequest = (formData: FormData) => {

    const newRequest = confirmationNewRequestAction(form.getValues())

    toast.promise(newRequest, {
      loading: 'Отправляем письмо...',
      success: () => {
        setNewConfirmRequest(false)
        return `На почту ${formData.get("email")} отправлена ссылка для подтверждения`;
      },
      error: (err) => {
        return <AuthError data={err as Error} />
      }
    });
  };
  

  return (
    <Form {...form}>
      <form 
        action={handleNewRequest}
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
  )
}
