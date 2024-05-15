"use client"

import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import { NavigationMenu, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import { cn } from '@/lib/utils'
import { CgMenuRight } from "react-icons/cg";
import { useSelectedLayoutSegment } from 'next/navigation'
import { ScrollArea } from '../ui/scroll-area'
import Link from 'next/link'

export default function NavSheet({
  className
}: {
  className?: string
}) {

  return (
    <Sheet>
      <SheetTrigger>
        <CgMenuRight className={cn("h-[2.5rem] w-[2.5rem]", className)} />
      </SheetTrigger>

      <SheetContent>
        <NavigationMenu orientation="vertical" className="mx-auto">
          <NavigationMenuList className="flex flex-col items-center">
            <ScrollArea className="font-Inter mt-[2vh] h-[90vh] w-full p-1">
              <SheetMenuItem href='/#about' title="О съезде" />
              <SheetMenuItem href='/#directions' title='Направления' />
              <SheetMenuItem href='/#programm' title='Программа' />
              <SheetMenuItem href='/#place' title='Место' />
              <SheetMenuItem href='/#materials' title='Материалы' />
            </ScrollArea>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  )
}


function SheetMenuItem({
  title,
  href
}: {
  title: string,
  href: string,
}) {

  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  return (
    <div className="mb-1 mt-2 flex w-full gap-1 py-2">
      <li className='flex justify-center w-full'>
        <Link 
          aria-current={isActive ? 'page' : undefined}
          href={href}
          // style={{fontWeight: isActive ? 'bold' : 'normal'}}
          className={cn(
            navigationMenuTriggerStyle(),
            "w-full h-fit"
          )}
        >
          <SheetClose className="px-3 py-2 text-base text-left w-full h-full">
            {title}
          </SheetClose>
        </Link>
      </li>
    </div>
  );
}
