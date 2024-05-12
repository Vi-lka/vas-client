import type { ReactNode } from 'react';
import React from 'react'
import type { CalendarEvent } from "calendar-link";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { FaApple, FaGoogle, FaYahoo } from "react-icons/fa";
import { SiMicrosoftoutlook } from "react-icons/si";
import { TbBrandOffice } from "react-icons/tb";

const event: CalendarEvent = {
  title: "Всероссийский Aрхеологический Cъезд",
  description: `Вы можете ознакомиться со всей информацией и состоянием вашего доклада на сайте: ${process.env.NEXT_PUBLIC_URL}`,
  start: "2025-10-6 0:00:00 +0700",
  end: "2025-10-10 0:00:00 +0700",
  location: "г. Красноярск, пр. Свободный, 82"
};

export default function CalendarLink({
    children
}: {
    children?: ReactNode
}) {
    const googleUrl = google(event); // https://calendar.google.com/calendar/render...
    const outlookUrl = outlook(event); // https://outlook.live.com/owa/...
    const office365Url = office365(event); // https://outlook.office.com/owa/...
    const yahooUrl = yahoo(event); // https://calendar.yahoo.com/?v=60&title=...
    const icsUrl = ics(event); // standard ICS file based on https://icalendar.org

    return (
        <Dialog>
            <DialogTrigger asChild={children ? false : true}>
                {children ? children 
                    : (
                        <Button variant="ghost" size="sm" className="pointer-events-auto">
                            <CalendarIcon className="h-4 w-4" />
                            <p className='ml-2'>Добавить в календарь</p>
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Выберите календарь</DialogTitle>
                    <DialogDescription>
                        Это действие создаст запись о съезде в вашем календаре, включая даты, место проведения, и ссылку на сайт.
                    </DialogDescription>
                </DialogHeader>
                <ul className='flex flex-col gap-4 items-center justify-center mt-1'>
                    <CalendarLinkItem href={googleUrl}>
                        <FaGoogle /> Google Calendar
                    </CalendarLinkItem>

                    <CalendarLinkItem href={icsUrl}>
                        <FaApple /> Apple (ics)
                    </CalendarLinkItem>

                    <CalendarLinkItem href={outlookUrl}>
                        <SiMicrosoftoutlook /> Outlook
                    </CalendarLinkItem>

                    <CalendarLinkItem href={office365Url}>
                        <TbBrandOffice /> Office365
                    </CalendarLinkItem>

                    <CalendarLinkItem href={yahooUrl}>
                        <FaYahoo /> Yahoo
                    </CalendarLinkItem>
                </ul>
            </DialogContent>
        </Dialog>
    )
}


function CalendarLinkItem({
    href,
    children
}: {
    href: string,
    children: ReactNode
}) {
    return (
        <DialogClose asChild>
            <Link href={href} target="_blank" passHref className='w-full'>
                <li>
                    <Button variant="outline" className='flex items-center gap-2 w-full font-medium shadow text-base p-6 '>
                        {children}
                    </Button>
                </li>
            </Link>
        </DialogClose>
    )
}