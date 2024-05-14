import { cn, getValidChildren } from '@/lib/utils'
import { Circle } from 'lucide-react'
import React from 'react'
import "./timeline-horizontal.css"

export function TimelineHorizontal({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  const countChildren = getValidChildren(children).length

  return (
    <div className={cn('pl-2.5 md:pl-0', className)} >
      <div className="timeline-horizontal">
        <ol 
          className="text-sm lg:text-base font-medium text-foreground" 
          style={{ gridTemplateColumns: `repeat(${countChildren}, minmax(0, 1fr))` }}
        >
          {children}
        </ol>
      </div>
    </div>
  )
}

export function TimelineHorizontalItem({
  title,
  time,
  className
}: {
  title: string,
  time?: string,
  className?: string
}) {
  return (
    <li className={cn("text-foreground", className)} >
      <span className="rounded-full bg-primary text-background">
        <Circle />
      </span>

      <span>{title}</span>

      {time && (
        <span className='lg:text-sm text-sm font-normal'>{time}</span>
      )}
    </li>
  )
}
