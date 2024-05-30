"use client"

import { translateError } from '@/lib/utils'
import { CircleAlert } from 'lucide-react'
import React from 'react'
import * as Sentry from "@sentry/nextjs";

export default function AuthError({ 
    data,
    title
}: { 
    data: Error | string,
    title?: string
}) {
  
  Sentry.captureException(data);

  return (
    <div className='flex items-center gap-2'>
        <CircleAlert className='w-5 h-5' />
        <div className='space-y-1 flex-1'>
            {title && (
                <p className='font-Inter font-medium'>
                    {title}
                </p>
            )}
            {typeof data === "string" 
                ? <p className='font-Inter'>{translateError(data, data)}</p>
                : <p className='font-Inter'>{translateError(data.message, data.message)}</p>
            }
        </div>
    </div>
  )
}
