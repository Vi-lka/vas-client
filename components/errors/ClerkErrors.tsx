import { translateClerkError } from '@/lib/utils'
import { CircleAlert } from 'lucide-react'
import React from 'react'
import { z } from 'zod'

export const ClerkError = z.object({
    errors: z.object({
        code: z.string(),
        message: z.string(),
        longMessage: z.string()
    }).array()
});
export type ClerkError = z.infer<typeof ClerkError>;

export function SignUpError({ 
    data,
    title
}: { 
    data: ClerkError | Error,
    title?: string
}) {
  console.error(JSON.stringify(data, null, 2));

  const clerkError = ClerkError.safeParse(data);

  return (
    <div className='flex items-center gap-2'>
        <CircleAlert className='w-5 h-5' />
        <div className='space-y-1 flex-1'>
            {title && (
                <p className='font-Inter font-medium'>
                    {title}
                </p>
            )}
            {clerkError.success 
                ? (clerkError.data.errors.map((err, indx) => (
                    <p key={indx} className='font-Inter'>
                        {translateClerkError(err.code, err.longMessage)}
                    </p>
                )))
                : <p className='font-Inter'>{(data as Error).message}</p>
            }
        </div>
    </div>
  )
}
