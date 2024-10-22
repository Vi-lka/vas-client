"use client"

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils'
import React from 'react'
import { useFormStatus } from 'react-dom';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
      <Input 
        ref={ref}
        type={type}
        disabled={disabled || pending}
        className={cn('bg-input rounded-lg border-border shadow-sm', className)}
        {...props}
      />
    )
  }
)
InputField.displayName = "InputField"

export { InputField }
