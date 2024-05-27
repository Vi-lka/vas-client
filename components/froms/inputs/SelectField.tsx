"use client"

import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import type * as SelectPrimitive from "@radix-ui/react-select"

interface SelectCustomProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
    data: {
      value: string,
      label: string,
    }[]
    placeholder?: React.ReactNode,
    className?: string,
    onChange: (...event: unknown[]) => void
  }

const SelectField = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Root>, SelectCustomProps>(
  ({ className, placeholder, data, disabled, onChange, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
      <Select 
        disabled={disabled || pending} 
        onValueChange={onChange}
        {...props}
      >
        <SelectTrigger ref={ref} className={cn('bg-input rounded-lg border-border shadow-sm', className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.map((item, indx) => (
              <SelectItem 
                key={indx} 
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }
)
SelectField.displayName = "SelectField"

export { SelectField }