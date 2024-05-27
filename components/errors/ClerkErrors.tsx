import { translateClerkError } from '@/lib/utils'
import { CircleAlert } from 'lucide-react'
import React from 'react'

export type ClerkError = {
    errors: {
        code: string,
        message: string,
        longMessage: string
    }[]
}

export function SignUpError({ 
    data,
    title
}: { 
    data: ClerkError,
    title?: string
}) {
  console.error(JSON.stringify(data, null, 2));
  return (
    <div className='flex items-center gap-2'>
        <CircleAlert className='w-5 h-5' />
        <div className='space-y-1 flex-1'>
            {title && (
                <p className='font-Inter font-medium'>
                    {title}
                </p>
            )}
            {data.errors.map((err, indx) => (
                <p key={indx} className='font-Inter'>
                    {translateClerkError(err.code, err.longMessage)}
                </p>
            ))}
        </div>
    </div>
  )
}
