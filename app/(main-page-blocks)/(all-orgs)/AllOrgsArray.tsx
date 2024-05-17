import React from 'react';
import type { OrgsItemT } from "@/lib/types/mainPage";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import Image from 'next/image';

export default function AllOrgsArray({
  title,
  children
}: {
  title: React.ReactNode,
  children: React.ReactNode
}) {
  return (
    <section className="px-8">
      <div className="lg:container mx-auto text-center">
        {title}
        <div className="flex flex-wrap justify-center lg:gap-4 gap-2 lg:max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </section>
  )
}


export function AllOrgsItem({
  data,
  className
}: {
  data: OrgsItemT,
  className?: string
}) {

  const item = (
    <figure
      className={cn(
        "relative flex flex-col justify-center overflow-hidden rounded-lg border border-transparent px-2 py-4",
        "group bg-card",
        "transform-gpu transition-all duration-300 ease-out",
        data.url ? "hover:shadow-md hover:border-border" : className
      )}
    >
      <Image 
        src={data.image.data.attributes.url} 
        alt={data.title} 
        width={120}
        height={120}
        className={cn(
          'object-contain aspect-square overflow-hidden rounded-2xl p-1 mx-auto',
          data.url ? "group-hover:scale-105 transition-all duration-300" : ""
        )}
      />
      <div className="flex h-full flex-col justify-center flex-1 mt-1.5 mx-auto">
        <figcaption className={cn(
          "font-medium text-center tracking-tight leading-5",
          data.url ? "group-hover:text-primary group-hover:-translate-y-1 transition-all duration-300" : ""
        )}>
          {data.title}
        </figcaption>
      </div>
    </figure>
  )

  if (data.url) return (
    <Link href={data.url} target="_blank" passHref className={cn('cursor-pointer', className)}>
      {item}
    </Link>
  ) 
  else return item
}