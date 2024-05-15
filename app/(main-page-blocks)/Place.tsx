import BlocksRendererStrapi from '@/components/content-blocks/BlocksRendererStrapi';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography'
import { Button } from '@/components/ui/button';
import fetchData from '@/lib/fetchData';
import { PlaceT } from '@/lib/types/mainPage';
import { Map } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import Image from "next/image";

export default async function Place() {

  const getPlace = async (): Promise<PlaceT> => {
    const query = /* GraphGL */ `
      query Place {
        place {
          data {
            attributes {
              title
              address
              description
              titleAboutCity
              imageAboutCity {
                data {
                  attributes { url }
                }
              }
              descriptionAboutCity
            }
          }
        }
      }
    `;
  
    const json = await fetchData<{ 
      data: { 
        place: { 
          data: PlaceT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Place"
    })
  
    // await new Promise((resolve) => setTimeout(resolve, 2000))
  
    if (json.data.place.data === null) notFound();
    
    const data = PlaceT.parse(json.data.place.data);
    
    return data;
  };
  
  const [ dataResult ] = await Promise.allSettled([ getPlace() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Место проведения"
      notFound={false}
    />
  )

  return (
    <div id='place' className='container pt-24'>
      <TypographyH1 className='mb-12'>
        {dataResult.value.attributes.title}
      </TypographyH1>

      <div className='flex lg:flex-row flex-col-reverse gap-8'>
        <div className='lg:w-3/4 w-full'>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <BlocksRendererStrapi content={dataResult.value.attributes.description} />
        </div>

        <div className='relative lg:aspect-square aspect-[5/1] lg:w-1/4 w-3/5 mx-auto'>
          <Link 
            href={`https://maps.yandex.ru/?text=${dataResult.value.attributes.address}`} 
            target="_blank"
            passHref 
            className='flex justify-center relative z-20 lg:mt-20 mt-16'
          >
            <Button 
              variant="secondary" 
              className='font-medium text-base tracking-tighter border bg-background hover:text-background hover:bg-primary/90 p-6'
            >
              Открыть на карте
              <Map className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Image 
            src={"/globe.png"} 
            alt={"Globe"}
            fill
            sizes='(max-width: 1024px) 100vw, 25vw'
            className="absolute object-cover object-top lg:[mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [mask-image:linear-gradient(to_top,transparent_10%,#000_40%)] z-10"
          />
        </div>
      </div>
    </div>
  )
}
