"use client"

import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { Loader2 } from 'lucide-react';
import AccountBar from './AccountBar';
import { useSession } from 'next-auth/react';

export default function AccountButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return (
    <Skeleton className='flex items-center justify-center h-11 w-11 rounded-full'>
      <Loader2 className='w-7 h-7 animate-spin transition-all'/>
    </Skeleton>
  )

  if (!session) {
    return (
      <Link href="/sign-in" passHref className=''>
        <Button variant="outline" className='font-medium text-base sm:px-8 sm:py-5 px-6 py-4'>
          Вход
        </Button>
      </Link>
    );
  }
  
  return (
    <AccountBar user={session.user} />
  );
}
