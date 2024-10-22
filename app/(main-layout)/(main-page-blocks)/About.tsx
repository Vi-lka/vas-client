import BlocksRendererStrapi from '@/components/content-blocks/BlocksRendererStrapi';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import fetchData from '@/lib/fetchData';
import { AboutT } from '@/lib/types/mainPage';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function About() {
  const getAbout = async (): Promise<AboutT> => {
    const query = /* GraphGL */ `
      query About {
        about {
          data {
            attributes {
              text
              content {
                __typename
                ... on ComponentContentTextBlock {
                  title text
                }
                ...on ComponentContentImageSlider {
                  title
                  images {
                    data {
                      attributes { url }
                    }
                  }
                }
                ...on ComponentContentFiles {
                  title
                  files {
                    title
                    description
                    file {
                      data {
                        attributes { url }
                      }
                    }
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
        about: { 
          data: AboutT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch About"
    })
  
    // await new Promise((resolve) => setTimeout(resolve, 2000))
  
    if (json.data.about.data === null) notFound();
    
    const data = AboutT.parse(json.data.about.data);
    
    return data;
  };
  
  const [ dataResult ] = await Promise.allSettled([ getAbout() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
        error={dataResult.reason as unknown} 
        place="О Съезде"
        notFound={false}
    />
  )

  return (
    <div id='about' className='container pt-24'>
      <TypographyH1 className='mb-8'>
        О Съезде
      </TypographyH1>
      <div className='lg:text-justify'>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <BlocksRendererStrapi content={dataResult.value.attributes.text} />
      </div>
      <div className='flex justify-end'>
        <Link href={"/history"} passHref className='w-fit h-fit'>
          <Button variant="link" className='px-0 items-center md:text-base text-sm underline-offset-4 hover:underline hover:underline-offset-8 transition-all duration-300'>
            Подробнее об истории съезда <ChevronRight className='md:w-7 md:h-7 w-6 h-6' />
          </Button>
        </Link>
      </div>
    </div>
  ) 
}
