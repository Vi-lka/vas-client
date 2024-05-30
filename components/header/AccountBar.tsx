"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { BadgeRussianRuble, Bed, CalendarDays, CircleUserRound, ClipboardList, Compass, FileType2, Plane } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import type { User } from 'next-auth'
import { signOut } from 'next-auth/react'

export default function AccountBar({ 
  user
}: { 
  user: User,
}) {

  const hasReport = user.report === true

  const navWhitReport = hasReport 
    ? [
      {title: "Тезисы", href: "/account/abstracts", children: <FileType2 className="h-4 w-4 flex-none" />},
      {title: "Прибытие и отъезд", href: "/account/arrival-departure", children: <Plane className="h-4 w-4 flex-none" />},
      {title: "Организационный взнос", href: "/account/fee", children: <BadgeRussianRuble className="h-4 w-4 flex-none" />},
    ] : []

  const nav = [
    {title: "Профиль", href: "/account", children: <CircleUserRound className="h-4 w-4 flex-none" />},
    {title: "Заявка", href: "/account/data", children: <ClipboardList className="h-4 w-4 flex-none" />},
    ...navWhitReport,
    {title: "Информационные письма", href: "/account/info", children: <InfoCircledIcon className="h-4 w-4 flex-none" />},
    {title: "Программа съезда", href: "/account/programm", children: <CalendarDays className="h-4 w-4 flex-none" />},
    {title: "Экскурсии", href: "/account/excursions", children: <Compass className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
    {title: "Гостиницы", href: "/account/hotel", children: <Bed className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
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
          {user.name}
          <p className='text-xs text-muted-foreground font-normal'>{user.email}</p>
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
        
        <DropdownMenuItem 
          className='cursor-pointer text-center justify-center rounded-lg hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground'
          onClick={() => void signOut()}
        >
          Выход
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
