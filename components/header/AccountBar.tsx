"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { CircleUserRound, Loader2 } from 'lucide-react'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { Skeleton } from '../ui/skeleton'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

export default function AccountBar({
  sessionId,
}: {
  sessionId: string,
}) {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return (
    <Skeleton className='flex items-center justify-center h-11 w-11 rounded-full'>
      <Loader2 className='w-7 h-7 animate-spin transition-all'/>
    </Skeleton>
  )

  if (!isSignedIn) return (
    <Link href="/sign-in" passHref className=''>
      <Button variant="outline" className='font-medium text-base sm:px-8 sm:py-5 px-6 py-4'>
        Вход
      </Button>
    </Link>
  )

  return (
    <DropdownMenu modal={false}>
      <TooltipProvider delayDuration={50}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-full shadow-sm">
                <CircleUserRound className="h-7 w-7" />
                <span className="sr-only">Открыть меню пользователя</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent sideOffset={10} side="bottom">Мой аккаунт</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="end" className='rounded-xl'>
        <DropdownMenuLabel>
          {user.firstName + " " + user.lastName}
          <p className='text-xs text-muted-foreground font-normal'>{user.primaryEmailAddress?.emailAddress}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='cursor-pointer rounded-lg'>Settings</DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer rounded-lg'>Support</DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <SignOutButton signOutOptions={{ sessionId }}>
          <DropdownMenuItem className='cursor-pointer text-center justify-center rounded-lg hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground'>
            Выход
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
