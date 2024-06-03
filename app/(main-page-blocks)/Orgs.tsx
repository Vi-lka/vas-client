import ErrorHandler from '@/components/errors/ErrorHandler';
import Marquee from '@/components/magic/marquee'
import { getOrgs } from '@/lib/queries/getOrgs';
import { cn, fixDanglingPre } from '@/lib/utils'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Orgs() {
  
  const [ dataResult ] = await Promise.allSettled([ getOrgs() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
        error={dataResult.reason as unknown} 
        place="Организаторы"
        notFound
        goBack={false}
    />
  )

  const allData = [
    ...dataResult.value.attributes.main, 
    ...dataResult.value.attributes.support, 
    ...dataResult.value.attributes.partners,
    ...dataResult.value.attributes.co_organizers
  ]

  return (
    <Marquee
      pauseOnHover
      className="absolute top-5 [--duration:60s] [mask-image:linear-gradient(to_top,transparent_0%,#000_30%)]"
    >
      {allData.map((f, idx) => (
        f.url ? (
          <Link key={idx} href={f.url} target="_blank" className=''>
            <figure
              className={cn(
                "relative max-w-44 h-full cursor-pointer overflow-hidden rounded-lg border p-2",
                "border-transparent hover:border-border bg-secondary/70 hover:bg-card",
                "transform-gpu transition-all duration-300 ease-out",
              )}
            >
              <Image 
                src={f.image.data.attributes.url} 
                alt={f.title} 
                width={100}
                height={100}
                className='object-contain aspect-square overflow-hidden rounded-2xl p-2 mx-auto'
              />
              <div className="flex flex-col justify-center">
                <figcaption className="text-xs text-center font-light tracking-tighter leading-4">
                  {fixDanglingPre(f.title)}
                </figcaption>
              </div>
            </figure>
          </Link>
        ) : (
          <figure
            key={idx}
            className={cn(
              "relative max-w-44 overflow-hidden rounded-lg border p-2",
              "border-transparent hover:border-border bg-secondary/70 hover:bg-card",
              "transform-gpu transition-all duration-300 ease-out",
            )}
          >
            <Image 
              src={f.image.data.attributes.url} 
              alt={f.title} 
              width={100}
              height={100}
              className='object-contain aspect-square overflow-hidden rounded-2xl p-2 mx-auto'
            />
            <div className="flex flex-col justify-center">
              <figcaption className="text-xs text-center font-light tracking-tighter leading-4">
                {fixDanglingPre(f.title)}
              </figcaption>
            </div>
          </figure>
        )
      ))}
    </Marquee>
  )
}
