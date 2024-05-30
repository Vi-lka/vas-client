import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function LoadingPage() {
  return (
    <div className='w-full h-full min-h-80'>
      <Skeleton className='w-full h-full flex items-center justify-center rounded-2xl'>
        <Loader2 className='w-8 h-8 animate-spin transition-all' />
      </Skeleton>
    </div>
  )
}
