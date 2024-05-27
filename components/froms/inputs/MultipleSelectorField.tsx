import type { MultipleSelectorProps, MultipleSelectorRef } from '@/components/ui/select-multi';
import MultipleSelector from '@/components/ui/select-multi';
import { cn } from '@/lib/utils';
import React from 'react'
import { useFormStatus } from 'react-dom';

const MultipleSelectorField = React.forwardRef<MultipleSelectorRef, MultipleSelectorProps>(
    ({className, disabled, ...props}: MultipleSelectorProps, ref: React.Ref<MultipleSelectorRef>) => {
        const { pending } = useFormStatus();

        return (
            <MultipleSelector 
                ref={ref} 
                disabled={disabled || pending}
                className={cn('bg-input rounded-lg border-border shadow-sm', className)}
                {...props}
            />
        );
    }
);

MultipleSelectorField.displayName = 'MultipleSelectorField';
export default MultipleSelectorField;
