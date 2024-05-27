"use client"

import React from 'react';
import RadioGroupInline from '@/components/ui/radio-group-inline';
import { useFormStatus } from 'react-dom';

export default function RadioField({
  data,
  defaultValue,
  disabled,
  onValueChange,
  className
}: {
  data: {
    value: string,
    label: string,
  }[],
  defaultValue:  string | undefined,
  disabled: boolean | undefined,
  onValueChange: ((value: string) => void),
  className?: string
}) {

  const { pending } = useFormStatus();

  return (
    <RadioGroupInline 
      data={data} 
      defaultValue={defaultValue}
      disabled={disabled || pending}
      onValueChange={onValueChange}
      className={className} 
    />
  )
}
