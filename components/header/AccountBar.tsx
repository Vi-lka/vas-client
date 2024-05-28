"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { BadgeRussianRuble, CalendarDays, CircleUserRound, ClipboardList, FileType2, Loader2, Plane } from 'lucide-react'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { Skeleton } from '../ui/skeleton'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import type { MetadataFormT } from '@/lib/types/forms'
import { InfoCircledIcon } from '@radix-ui/react-icons'

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

  const userMetadata = (user.unsafeMetadata as MetadataFormT)
  const hasReport = userMetadata.report === true


  const navWhitReport = hasReport 
    ? [
      {title: "Тезисы", href: "/account/abstracts", children: <FileType2 className="h-4 w-4 flex-none" />},
      {title: "Прибытие и отбытие", href: "/account/arrival-departure", children: <Plane className="h-4 w-4 flex-none" />},
      {title: "Организационный взнос", href: "/account/fee", children: <BadgeRussianRuble className="h-4 w-4 flex-none" />},
    ] : []

  const nav = [
    {title: "Профиль", href: "/account", children: <CircleUserRound className="h-4 w-4 flex-none" />},
    {title: "Заявка", href: "/account/data", children: <ClipboardList className="h-4 w-4 flex-none" />},
    ...navWhitReport,
    {title: "Информационные письма", href: "/account/info", children: <InfoCircledIcon className="h-4 w-4 flex-none" />},
    {title: "Программа съезда", href: "/account/programm", children: <CalendarDays className="h-4 w-4 flex-none" />},
  ]

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
      <DropdownMenuContent className='rounded-xl'>
        <DropdownMenuLabel>
          {user.firstName + " " + user.lastName}
          <p className='text-xs text-muted-foreground font-normal'>{user.primaryEmailAddress?.emailAddress}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {nav.map((item, indx) => (
          <Link key={indx} href={item.href} passHref>
            <DropdownMenuItem className='gap-2 cursor-pointer rounded-lg'>
              {item.children}{item.title}
            </DropdownMenuItem>
          </Link>
        ))}

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
