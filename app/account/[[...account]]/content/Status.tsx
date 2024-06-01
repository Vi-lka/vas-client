import type { StatusEnum } from '@/lib/types/users'
import { cn } from '@/lib/utils'
import { Check, CircleAlert } from 'lucide-react'
import React from 'react'

export default function Status({
    report,
    status,
}: {
    report: boolean,
    status: StatusEnum | null,
}) {

    if (!report || !status || status.length === 0) return null

    return (
        <p className='inline-flex items-center gap-2 md:text-base text-sm min-w-60'>
            Статус заявки: 
            <span className={cn(
                'inline-flex items-center gap-1 font-medium px-3 py-1 rounded-3xl overflow-hidden shadow',
                status === 'получена' && "bg-secondary text-secondary-foreground border",
                status === 'одобрена' && "bg-green-600 text-background dark:bg-green-700 dark:text-foreground",
                status === 'на доработке' && "bg-amber-500 text-background dark:bg-amber-600 dark:text-foreground",
            )}>
                <StatusIcon status={status}/>{status}
            </span>
        </p>
    )
}

function StatusIcon({
    status
}: {
    status: StatusEnum,
}) {

    switch (status) {
        case 'получена':
            return null;

        case "одобрена":
            return <Check className='w-5 h-5'/>;

        case "на доработке":
            return <CircleAlert className='w-5 h-5'/>;
    
        default:
            return null;
    }
}
