"use client"

import React from "react";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import type {AutosizeTextAreaProps, AutosizeTextAreaRef} from "@/components/ui/autosize-textarea";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

const AutosizeTextareaField = React.forwardRef<AutosizeTextAreaRef, AutosizeTextAreaProps>(
  (
    {className, disabled, ...props}: AutosizeTextAreaProps,
    ref: React.Ref<AutosizeTextAreaRef>,
  ) => {

    const { pending } = useFormStatus();

    return (
        <AutosizeTextarea
            ref={ref}
            disabled={disabled || pending}
            className={cn('bg-input rounded-lg border-border shadow-sm', className)}
            {...props}
        />
    );
  },
);
AutosizeTextareaField.displayName = 'AutosizeTextareaField';

export { AutosizeTextareaField }