"use client"

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils'
import React from 'react'
import { useFormStatus } from 'react-dom';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, disabled, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
        <Textarea 
            ref={ref}
            disabled={disabled || pending}
            className={cn('bg-input rounded-lg border-border shadow-sm', className)}
            {...props}
        />
    )
  }
)
TextareaField.displayName = "TextareaField"

export { TextareaField }
