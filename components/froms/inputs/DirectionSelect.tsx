"use client"

import React from 'react';
import type { UseFormReturn, ControllerRenderProps } from 'react-hook-form';
import type { MetadataFormT } from '@/lib/types/forms';
import useSWR from 'swr';
import type { DirectionsT } from '@/lib/types/mainPage';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorToast from '@/components/errors/ErrorToast';
import ComboboxField from './ComboboxField';

type DirectionSelectData = {
  direction: {
    data: DirectionsT
  }
}

export default function DirectionSelect({
  form,
  field,
}: {
  form: UseFormReturn<MetadataFormT>,
  field: ControllerRenderProps<MetadataFormT, "direction">
}) {

  const { data, error, isLoading } = useSWR<DirectionSelectData, Error>(
    `query Directions {
      direction {
        data {
          attributes {
            title
            items(sort: "title:asc") { title }
          }
        }
      }
    }`
  );

  if (isLoading) return <Skeleton className='rounded-lg border-border shadow h-10 w-full'/>
  if (error) {
    console.error(JSON.stringify(error, null, 2))
    return <ErrorToast error={error.message} place="Направления" returnNull />;
  }
  if (!data || !data.direction.data || (data.direction.data.attributes.items.length === 0)) {
    return null;
  }

  const dataForField = data.direction.data.attributes.items.map(item => {
    return {value: item.title, label: item.title}
  })

  return (
    <ComboboxField
      data={dataForField}
      disabled={form.formState.isSubmitting}
      placeholder="Выберите направление..."
      className='bg-background rounded-lg border-border shadow'
      onSelect={(value) => form.setValue(field.name, value, {shouldDirty: true, shouldTouch: true, shouldValidate: true})}
    />
  )
}
