"use client"

import React from 'react';
import useSWR from 'swr';
import type { DirectionsT } from '@/lib/types/mainPage';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorToast from '@/components/errors/ErrorToast';
import ComboboxField from './ComboboxField';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';

type DirectionSelectData = {
  direction: {
    data: DirectionsT
  }
}

export default function DirectionSelect({
  name,
  defaultValue,
  disabled,
  className
}: {
  name: string,
  defaultValue: string,
  disabled: boolean,
  className?: string
}) {

  const form = useFormContext();

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
      disabled={disabled}
      defaultValue={defaultValue}
      placeholder="Выберите направление..."
      className={cn('bg-background rounded-lg border-border shadow', className)}
      onSelect={(value) => form.setValue(name, value, {shouldDirty: true, shouldTouch: true, shouldValidate: true})}
    />
  )
}
