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
        <div className="flex flex-wrap justify-center gap-6 lg:max-w-6xl mx-auto">
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
        "relative flex flex-col justify-center overflow-hidden rounded-lg border p-2",
        "bg-secondary/70 hover:bg-card",
        "transform-gpu transition-all duration-300 ease-out",
        data.url ? "" : className
      )}
    >
      <Image 
        src={data.image.data.attributes.url} 
        alt={data.title} 
        width={120}
        height={120}
        className='object-contain aspect-square overflow-hidden rounded-2xl p-2 mx-auto'
      />
      <div className="flex h-full flex-col justify-center flex-1">
        <figcaption className="text-center tracking-tight leading-5">
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