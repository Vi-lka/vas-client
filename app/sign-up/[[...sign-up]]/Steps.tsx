import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import React from 'react'

export default function Steps({
  data,
  value,
  className,
}: {
  data: {
    title: string,
    active?: boolean,
    children?: React.ReactNode
  }[],
  value: number,
  className?: string
}) {
  return (
      <div className={className}>
        <Progress value={value} className='w-full' />

        <ol className="mt-3 grid text-sm font-medium" style={{gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))`}}>
          {data.map((item, indx) => (
            <StepsItem 
              key={indx} 
              title={item.title} 
              active={item.active}
              className={
                (indx === 0) 
                  ? "justify-start"
                  : ((indx + 1) === data.length) 
                    ? "justify-end"
                    : "justify-center"
              }
            >
              {item.children}
            </StepsItem>
          ))}
        </ol>
      </div>
  )
}

function StepsItem({
  title,
  active,
  children,
  className
}: {
  title: string,
  active?: boolean,
  children?: React.ReactNode
  className?: string
}) {
  return (
    <li className={cn(
      "flex items-center justify-start sm:gap-1.5",
      active ? "text-primary" : "text-muted-foreground",
      className
    )}>
      <span className="hidden sm:inline"> {title} </span>
      {children}
    </li>
  )
}