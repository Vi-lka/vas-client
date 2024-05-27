"use client"

import { SignOutButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';

export default function AccountButton() {
    const { sessionId } = useAuth();

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
      <div>
        <SignOutButton signOutOptions={{ sessionId }}>
            <Button variant="outline" className='font-medium text-base sm:px-8 sm:py-5 px-6 py-4'>
                Выход
            </Button>
        </SignOutButton>
      </div>
    );
}
