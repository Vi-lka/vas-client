import { Select } from '@/components/filters/Select'
import { cn } from '@/lib/utils'
import React from 'react'

const statusValues = [
    { value: "получена", label: "получена" },
    { value: "одобрена", label: "одобрена" },
    { value: "на доработке", label: "на доработке" },
]

export default function Filters({
    className
}: {
    className?: string
}) {
    return (
        <div className={cn('flex flex-wrap gap-3', className)}>
            <Select 
                isMulti={false} 
                values={statusValues} 
                param='status' 
                placeholder="Статус заявки" 
                align="center"
                className='max-w-none'
            />
        </div>
    )
}
