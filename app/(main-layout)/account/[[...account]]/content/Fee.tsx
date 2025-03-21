import React from 'react'
import { TypographyH3 } from '@/components/typography';
import { FeeT } from '@/lib/types/content';
import fetchData from '@/lib/fetchData';
import { notFound } from 'next/navigation';
import ErrorHandler from '@/components/errors/ErrorHandler';
import BlocksRendererStrapi from '@/components/content-blocks/BlocksRendererStrapi';

export default async function Fee() {
  const getFee = async (): Promise<FeeT> => {
    const query = /* GraphGL */ `
      query Fee {
        fee {
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
        fee: { 
          data: FeeT
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Fee"
    })
  
    // await new Promise((resolve) => setTimeout(resolve, 2000))
  
    if (json.data.fee.data === null) notFound();
    
    const data = FeeT.parse(json.data.fee.data);
    
    return data;
  };

  const [ dataResult ] = await Promise.allSettled([ getFee() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler
      error={dataResult.reason as unknown} 
      place="Организационный взнос"
      notFound={false}
    />
  )

  return (
    <div className='w-full'>
      <TypographyH3 className='lg:text-2xl md:text-xl text-lg'>Организационный взнос</TypographyH3>
      <p className='font-medium text-muted-foreground lg:text-lg md:text-base text-sm'>
        
      </p>
      <div className='mt-8'>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <BlocksRendererStrapi content={dataResult.value.attributes.text} />
      </div>
    </div>
  )
}