import React from 'react'
import NavigationLink from './NavigationLink'
import { BadgeRussianRuble, CalendarDays, CircleUserRound, ClipboardList, FileType2, Plane } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import type { MetadataFormT } from '@/lib/types/forms'

export type NavigationHrefT = "" | "data" | "abstracts" | "arrival-departure" | "fee" | "info" | "programm"

export type NavigationT = {
  title: string,
  href: NavigationHrefT,
  children: React.ReactNode
}

export default async function Navigation({
  className
}: {
  className?: string
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userMetadata = (user.unsafeMetadata as MetadataFormT)
  const hasReport = userMetadata.report === true

  const navWhitReport: NavigationT[] = hasReport 
    ? [
      {title: "Тезисы", href: "abstracts", children: <FileType2 className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
      {title: "Прибытие и отбытие", href: "arrival-departure", children: <Plane className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
      {title: "Организационный взнос", href: "fee", children: <BadgeRussianRuble className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
    ] : []

  const nav: NavigationT[] = [
    {title: "Профиль", href: "", children: <CircleUserRound className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
    {title: "Заявка", href: "data", children: <ClipboardList className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
    ...navWhitReport,
    {title: "Информационные письма", href: "info", children: <InfoCircledIcon className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
    {title: "Программа съезда", href: "programm", children: <CalendarDays className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
  ]

  return (
    <nav className={cn("flex flex-col items-start text-sm font-medium gap-2", className)}>
      {nav.map((item, indx) => (
        <NavigationLink key={indx} title={item.title} href={item.href.length > 0 ?`/account/${item.href}` : '/account'}>
          {item.children}
        </NavigationLink>
      ))}
    </nav>
  )
}