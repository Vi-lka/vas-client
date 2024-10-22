"use client"

import { PasswordInput } from '@/components/ui/password-input';
import { cn } from '@/lib/utils'
import React from 'react'
import { useFormStatus } from 'react-dom';

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>

const PasswordField = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
      <PasswordInput 
        ref={ref}
        disabled={disabled || pending}
        className={cn('bg-input rounded-lg border-border shadow-sm', className)}
        {...props}
      />
    )
  }
)
PasswordField.displayName = "PasswordField"

export { PasswordField }
