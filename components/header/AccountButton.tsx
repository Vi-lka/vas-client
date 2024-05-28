"use client"

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { Loader2 } from 'lucide-react';
import AccountBar from './AccountBar';

export default function AccountButton() {
  const { sessionId, isLoaded } = useAuth();

  if (!isLoaded) return (
    <Skeleton className='flex items-center justify-center sm:w-28 w-20 sm:h-[42px] h-10'>
      <Loader2 className='w-4 h-4 animate-spin transition-all'/>
    </Skeleton>
  )

  if (!sessionId) {
    return (
      <Link href="/sign-in" passHref className=''>
        <Button variant="outline" className='font-medium text-base sm:px-8 sm:py-5 px-6 py-4'>
          Вход
        </Button>
      </Link>
    );
  }
  
  return (
    <AccountBar sessionId={sessionId} />
  );
}
