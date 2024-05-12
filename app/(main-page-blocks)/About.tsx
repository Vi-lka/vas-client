import BlocksRendererStrapi from '@/components/content-blocks/BlocksRendererStrapi';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import fetchData from '@/lib/fetchData';
import { AboutT } from '@/lib/types/mainPage';
import { notFound } from 'next/navigation';
import React from 'react'
import AboutBento from './AboutBento';

export default async function About() {
  const getAbout = async (): Promise<AboutT> => {
    const query = /* GraphGL */ `
      query About {
        about {
          data {
            attributes {
              text
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
    <div id='about' className='container'>
      <TypographyH1 className='mb-2'>
        О Съезде
      </TypographyH1>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <BlocksRendererStrapi content={dataResult.value.attributes.text} />

      <div className='flex items-center min-h-screen my-24'>
        <AboutBento />
      </div>
    </div>
  ) 
}
