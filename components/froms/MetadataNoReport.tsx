"use client"

import React, { useEffect } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { InputField } from './inputs/InputField';
import type { UseFormReturn } from 'react-hook-form'
import type { MetadataFormT } from '@/lib/types/forms'

export default function MetadataNoReport({
  form,
  isPending
}: {
  form: UseFormReturn<MetadataFormT>,
  isPending: boolean
}) {

  useEffect(() => {
    form.setValue("report", false, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
  }, [form])
  
  return (
    <>
      <div className='sm:space-x-3 flex sm:flex-row flex-col items-center w-full'>
        <FormField
          control={form.control}
          name="familyName"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Фамилия<span className='text-destructive'>*</span></FormLabel>
              <FormControl>
                <InputField
                  disabled={form.formState.isSubmitting || isPending}
                  autoComplete="family-name"
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
          name="name"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Имя<span className='text-destructive'>*</span></FormLabel>
              <FormControl>
                <InputField
                  disabled={form.formState.isSubmitting || isPending}
                  autoComplete="given-name"
                  className='bg-background rounded-lg border-border shadow'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className='sm:space-x-3 flex sm:flex-row flex-col items-center w-full'>
        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Отчество (при наличии)</FormLabel>
              <FormControl>
                <InputField
                  disabled={form.formState.isSubmitting || isPending}
                  autoComplete="additional-name"
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
          name="phone"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Телефон<span className='text-destructive'>*</span></FormLabel>
              <FormControl>
                <InputField
                  placeholder='+7 999 999-99-99'
                  disabled={form.formState.isSubmitting || isPending}
                  autoComplete="tel"
                  className='bg-background rounded-lg border-border shadow'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className='sm:space-x-3 flex sm:flex-row flex-col items-center w-full'>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Страна<span className='text-destructive'>*</span></FormLabel>
              <FormControl>
                <InputField
                  disabled={form.formState.isSubmitting || isPending}
                  autoComplete="country-name"
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
          name="city"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Город<span className='text-destructive'>*</span></FormLabel>
              <FormControl>
                <InputField
                  disabled={form.formState.isSubmitting || isPending}
                  autoComplete="home city"
                  className='bg-background rounded-lg border-border shadow'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="organization"
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Организация</FormLabel>
            <FormControl>
              <InputField
                disabled={form.formState.isSubmitting || isPending}
                autoComplete="organization"
                className='bg-background rounded-lg border-border shadow'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
