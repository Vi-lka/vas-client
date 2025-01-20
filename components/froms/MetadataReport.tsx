"use client"

import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { MetadataFormT } from '@/lib/types/forms';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { InputField } from './inputs/InputField';
import { SelectField } from './inputs/SelectField';
import DirectionSelect from './inputs/DirectionSelect'
import RadioField from './inputs/RadioField';
import TableSelect from './inputs/TableSelect';
import { AutosizeTextareaField } from './inputs/AutosizeTextareaField';
import DropzoneFile from './inputs/DropzoneFile';
import MetadataReportAdditional from './MetadataReportAdditional';

export default function MetadataReport({
  form,
  isPending,
}: {
  form: UseFormReturn<MetadataFormT>,
  isPending: boolean,
}) {
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
      <div className='sm:space-x-3 flex sm:flex-row flex-col items-center w-full'>
        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Ученая степень<span className='text-destructive'>*</span></FormLabel>
              <FormControl>
                <InputField
                  disabled={form.formState.isSubmitting || isPending}
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
          name="rank"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Ученое звание<span className='text-destructive'>*</span></FormLabel>
              <FormControl>
                <InputField
                  disabled={form.formState.isSubmitting || isPending}
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
          name="organization"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Организация<span className='text-destructive'>*</span></FormLabel>
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
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Должность<span className='text-destructive'>*</span></FormLabel>
              <FormControl>
                <InputField
                  disabled={form.formState.isSubmitting || isPending}
                  autoComplete="organization-title"
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
          name="format"
          render={({ field }) => (
            <FormItem className='sm:w-[33%] w-full'>
              <FormLabel>Формат участия<span className='text-destructive'>*</span></FormLabel>
              <FormControl>
                <SelectField
                  data={[
                    {value: "очно", label: "Очно"},
                    {value: "дистанционно", label: "Дистанционно"},
                    {value: "стендовый доклад", label: "Стендовый доклад"},
                  ]}
                  disabled={form.formState.isSubmitting || isPending}
                  placeholder="Выберите формат участия"
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
          name="direction"
          render={({ field }) => (
            <FormItem className='sm:w-[66%] w-full'>
              <FormLabel>Направление<span className='text-destructive'>*</span></FormLabel>
              <FormControl>
                <DirectionSelect 
                  name="direction"
                  defaultValue={field.value}
                  disabled={form.formState.isSubmitting || isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="invitation"
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Требуется приглашение?<span className='text-destructive'>*</span></FormLabel>
            <FormControl>
              <RadioField 
                disabled={form.formState.isSubmitting || isPending}
                data={[
                  {value: "true", label: "Да"},
                  {value: "false", label: "Нет"}
                ]}
                defaultValue={
                  form.getValues(field.name) === true 
                    ? "true" 
                    : form.getValues(field.name) === false 
                      ? "false" : undefined
                }
                className='shadow'
                onValueChange={(value) => {
                  if (value === "true") form.setValue(field.name, true, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
                  else form.setValue(field.name, false, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="reportName"
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Название доклада<span className='text-destructive'>*</span></FormLabel>
            <FormControl>
              <InputField
                disabled={form.formState.isSubmitting || isPending}
                className='bg-background rounded-lg border-border shadow'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='w-full flex lg:flex-row flex-col justify-between lg:gap-3 gap-2'>
        <div className='lg:w-1/2 w-full'>
          <FormField
            control={form.control}
            name="reportFile"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Тезисы:</FormLabel>
                <FormControl>
                  <DropzoneFile
                    isImage={false}
                    formValue={field.value ? field.value : {
                      file: null,
                      url: "",
                    }}
                    formValueName={field.name}
                    accept={{
                      "application/msword": [".doc", ".docx", ".DOC", ".DOCX"],
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".doc", ".docx", ".DOC", ".DOCX"] 
                    }}
                    maxSize={5 * 1024 * 1024} // 5Mb
                    disabled={form.formState.isSubmitting || isPending}
                    className="min-h-32 bg-background rounded-lg border-dashed border border-primary/50 shadow hover:bg-secondary transition-all outline outline-1 outline-border outline-offset-2"
                  >
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      DOC, DOCX (Max 5Mb)
                    </p>
                  </DropzoneFile>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='lg:w-1/2 w-full'>
          <FormField
            control={form.control}
            name="imageFile"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Иллюстрация:</FormLabel>
                <FormControl>
                  <DropzoneFile
                    isImage
                    formValue={field.value ? field.value : {
                      file: null,
                      url: "",
                    }}
                    formValueName={field.name}
                      accept={{
                        'image/jpg': [],
                        'image/jpeg': [],
                        'image/png': [],
                      }}
                    maxSize={20 * 1024 * 1024} // 20Mb
                    disabled={form.formState.isSubmitting || isPending}
                    className="min-h-32 bg-background rounded-lg border-dashed border border-primary/50 shadow hover:bg-secondary transition-all outline outline-1 outline-border outline-offset-2"
                  >
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      JPEG, JPG, PNG (Max 20Mb)
                    </p>
                  </DropzoneFile>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <MetadataReportAdditional isPending={isPending} />

      <FormField
        control={form.control}
        name="tables"
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Планируется участие в работе круглых столов?</FormLabel>
            <FormControl>
              <TableSelect field={field} disabled={form.formState.isSubmitting || isPending} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="comment"
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Комментарии / пожелания / предложения</FormLabel>
            <FormControl>
              <AutosizeTextareaField
                disabled={form.formState.isSubmitting || isPending}
                minHeight={112}
                maxHeight={300}
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
