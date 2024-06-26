"use client"

import React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function NavMenu({
    className
}: {
    className?: string
}) {
    return (
        <NavigationMenu className={cn("", className)}>
            <NavigationMenuList>
                <NavMenuItem href='/#about' title='О съезде' />
                <NavMenuItem href='/#directions' title='Направления' />
                {/* <NavMenuItem href='/#programm' title='Программа' /> */}
                <NavMenuItem href='/#place' title='Место' />
                <NavMenuItem href='/#materials' title='Материалы' />
            </NavigationMenuList>
        </NavigationMenu>
    )
}

function NavMenuItem({
    href,
    title
}: {
    href: string,
    title: string
}) {
    return (
        <NavigationMenuItem>
            <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {title}
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    )
}
