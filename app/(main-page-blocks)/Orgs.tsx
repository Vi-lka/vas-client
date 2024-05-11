import ErrorHandler from '@/components/errors/ErrorHandler';
import Marquee from '@/components/magic/marquee'
import fetchData from '@/lib/fetchData';
import { OrgsT } from '@/lib/types/mainPage';
import { cn } from '@/lib/utils'
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function Orgs() {

  const getOrgs = async (): Promise<OrgsT> => {
    const query = /* GraphGL */ `
      query Orgs {
        org {
          data {
            attributes {
              items {
                title
                url
                image {
                  data {
                    attributes { url }
                  }
                }
              }
            }
          }
        }
      }
    `;
  
    const json = await fetchData<{ 
      data: { 
        org: { 
          data: OrgsT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Orgs"
    })
  
    // await new Promise((resolve) => setTimeout(resolve, 2000))
  
    if (json.data.org.data === null) notFound();
    
    const data = OrgsT.parse(json.data.org.data);
    
    return data;
  };
  
  const [ dataResult ] = await Promise.allSettled([ getOrgs() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
        error={dataResult.reason as unknown} 
        place="Организаторы"
        notFound
        goBack={false}
    />
  )

  return (
    <Marquee
      pauseOnHover
      className="absolute top-5 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_0%,#000_30%)]"
    >
      {dataResult.value.attributes.items.map((f, idx) => (
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
                className='object-contain aspect-square overflow-hidden rounded-full p-2 mx-auto'
              />
              <div className="flex flex-col justify-center">
                <figcaption className="text-xs text-center font-light tracking-tighter leading-4">
                  {f.title}
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
              className='object-contain aspect-square overflow-hidden rounded-full p-2 mx-auto'
            />
            <div className="flex flex-col justify-center">
              <figcaption className="text-xs text-center font-light tracking-tighter leading-4">
                {f.title}
              </figcaption>
            </div>
          </figure>
        )
      ))}
    </Marquee>
  )
}
