import { Select } from '@/components/filters/Select'
import { cn } from '@/lib/utils'
import React from 'react'

const booleanValues = [
    { value: "true", label: "Да" },
    { value: "false", label: "Нет" },
]
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
                values={booleanValues} 
                param='report' 
                placeholder="С докладом?" 
                align="center"
                className='max-w-none'
            />
            <Select 
                isMulti={false} 
                values={booleanValues} 
                param='confirmed' 
                placeholder="Подтвержден?" 
                align="center"
                className='max-w-none'
            />
            <Select 
                isMulti={false} 
                values={statusValues} 
                param='status' 
                placeholder="Статус заявки" 
                align="center"
                className='max-w-none'
            />
            <Select 
                isMulti={false} 
                values={booleanValues} 
                param='subscribedContent' 
                placeholder="Email (Контент)?" 
                align="center"
                className='max-w-none'
            />
            <Select 
                isMulti={false} 
                values={booleanValues} 
                param='subscribedReport' 
                placeholder="Email (Заявка)?" 
                align="center"
                className='max-w-none'
            />
            <Select 
                isMulti={false} 
                values={booleanValues} 
                param='metadata' 
                placeholder="Метаданные?" 
                align="center"
                className='max-w-none'
            />
            <Select
                isMulti={false} 
                values={booleanValues} 
                param='file' 
                placeholder="Файл?" 
                align="center"
                className='max-w-none'
            />
            <Select
                isMulti={false} 
                values={booleanValues} 
                param='image' 
                placeholder="Фото?" 
                align="center"
                className='max-w-none'
            />
        </div>
    )
}
