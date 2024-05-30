import React from 'react'
import NavigationLink from './NavigationLink'
import { BadgeRussianRuble, Bed, CalendarDays, CircleUserRound, ClipboardList, Compass, FileType2, Plane } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { redirect } from 'next/navigation'

export type NavigationHrefT = "" | "data" | "abstracts" | "arrival-departure" | "fee" | "info" | "programm" | "excursions" | "hotel"

export type NavigationItemT = {
  title: string,
  href: NavigationHrefT,
  children: React.ReactNode
}

export default async function Navigation({
  className
}: {
  className?: string
}) {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const hasReport = session.user.report === true

  const navWhitReport: NavigationItemT[] = hasReport 
    ? [
      {title: "Тезисы", href: "abstracts", children: <FileType2 className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
      {title: "Прибытие и отъезд", href: "arrival-departure", children: <Plane className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
      {title: "Организационный взнос", href: "fee", children: <BadgeRussianRuble className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
    ] : []

  const nav: NavigationItemT[] = [
    {title: "Профиль", href: "", children: <CircleUserRound className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
    {title: "Заявка", href: "data", children: <ClipboardList className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
    ...navWhitReport,
    {title: "Информационные письма", href: "info", children: <InfoCircledIcon className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
    {title: "Программа съезда", href: "programm", children: <CalendarDays className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
    {title: "Экскурсии", href: "excursions", children: <Compass className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
    {title: "Гостиницы", href: "hotel", children: <Bed className="lg:h-5 lg:w-5 h-6 w-6 flex-none" />},
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