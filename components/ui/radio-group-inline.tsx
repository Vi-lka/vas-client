"use client"

import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

import { cn } from "@/lib/utils";

export default function RadioGroupInline({
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

  const [value, setValue] = React.useState<string | undefined>();

  return (
    <RadioGroup 
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      className={cn(
        'items-center w-full text-sm font-medium shadow-sm border bg-card rounded-lg border-border sm:flex gap-0',
        className
      )}
    >
      {data.map((item, indx) => (
        <div 
          key={indx} 
          className={cn(
            "flex items-center space-x-2 w-full border-b sm:border-b-0 sm:border-l first:border-l-0 ps-3 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all",
            disabled && "cursor-not-allowed"
          )}
          onMouseDown={() => {
            if (!disabled) {
              setValue(item.value)
              onValueChange(item.value)
            }
          }}
        >
          <RadioGroupItem disabled={disabled} value={item.value} id={`r${indx}${item.value}`} />
          <Label 
            htmlFor={`r${indx}${item.value}`} 
            className={cn(
              'flex-1 w-full py-3 cursor-pointer', 
              disabled && "text-muted-foreground cursor-not-allowed"
            )}
          >
            {item.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
