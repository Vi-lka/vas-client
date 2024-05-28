"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavigationLink({
  title,
  href,
  children
}: {
  title: string,
  href: string,
  children?: React.ReactNode
}) {
  const pathname = usePathname()

  const hrefItem = href.split('/')[2] as string | undefined
  const pathnameItem = pathname.split('/')[2] as string | undefined

  return (
    <Link
      href={href}
      className={cn(
        "flex lg:w-full w-fit items-center gap-2 rounded-lg lg:px-3 px-2 py-2 text-foreground transition-all border border-transparent hover:bg-muted hover:shadow",
        hrefItem === pathnameItem ? "bg-muted border-border shadow" : ""
      )}
    >
      {children}
      <span className="lg:block hidden">{title}</span>
    </Link>
  )
}
