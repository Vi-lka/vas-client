import BlocksRendererStrapi from '@/components/content-blocks/BlocksRendererStrapi';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1, TypographyH5 } from '@/components/typography'
import { Button } from '@/components/ui/button';
import fetchData from '@/lib/fetchData';
import { PlaceT } from '@/lib/types/mainPage';
import { Map } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import Image from "next/image";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import fixDanglingPrefix from "@/lib/fixDanglingPrefix";

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
              additionalLinks {
                title
                image {
                  data {
                    attributes { url }
                  }
                }
                description
                page {
                  data {
                    attributes { slug }
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
        <div className='lg:w-3/4 w-full lg:text-justify'>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <BlocksRendererStrapi content={dataResult.value.attributes.description} />
        </div>

        <div className='relative lg:aspect-[3/1] aspect-[5/1] lg:w-1/4 w-3/5 mx-auto'>
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
            sizes='(min-width: 1024px) 25vw, 60vw'
            className="absolute object-cover object-top lg:[mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [mask-image:linear-gradient(to_top,transparent_10%,#000_40%)] z-10"
          />
        </div>
      </div>

      <div className='w-full flex flex-wrap gap-8 justify-center mt-12'>
        {dataResult.value.attributes.additionalLinks.map((item, indx) => {
          if (!item.page.data) return null

          return (
            <Link key={indx} href={item.page.data.attributes.slug} passHref className='lg:w-[calc(33%-1.3rem)] sm:w-[calc(50%-1.3rem)] w-full group'>
              <Card className='w-full h-full flex flex-col overflow-hidden ring-primary/80 group-hover:shadow-lg transition-all duration-300'>
                <CardContent className='relative w-full h-64 overflow-hidden'>
                  <Image 
                    src={item.image.data.attributes.url} 
                    alt=""
                    fill
                    sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                    className="absolute object-cover object-bottom group-hover:scale-105 transition-all duration-300 z-10"
                  />
                </CardContent>
                <CardFooter className='flex flex-col flex-1 justify-center gap-2 pt-4 text-center'>
                  <TypographyH5 className='font-medium group-hover:text-primary group-hover:-translate-y-1 transition-all duration-300'>
                    {fixDanglingPrefix(item.title)}
                    </TypographyH5>

                  {item.description && (
                    <p className='text-xs text-muted-foreground'>{fixDanglingPrefix(item.description)}</p>
                  )}
                </CardFooter>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
