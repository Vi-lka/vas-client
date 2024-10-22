import BlocksRendererStrapi from '@/components/content-blocks/BlocksRendererStrapi';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { TimelineHorizontal, TimelineHorizontalItem } from '@/components/ui/timeline-horizontal'
import fetchData from '@/lib/fetchData';
import { ProgrammT } from '@/lib/types/mainPage';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function Programm() {

  const getProgramm = async (): Promise<ProgrammT> => {
    const query = /* GraphGL */ `
    query Programm {
      programm {
        data {
          attributes {
            title
            items { 
              day
              times { title time }
            }
            description
          }
        }
      }
    }
    `;
  
    const json = await fetchData<{ 
      data: { 
        programm: { 
          data: ProgrammT
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Programm"
    })
  
    // await new Promise((resolve) => setTimeout(resolve, 2000))
  
    if (json.data.programm.data === null) notFound();
    
    const data = ProgrammT.parse(json.data.programm.data);
    
    return data;
  };
  
  const [ dataResult ] = await Promise.allSettled([ getProgramm() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Программа"
      notFound={false}
    />
  )

  return (
    <div id='programm' className='container pt-24'>
      <TypographyH1 className='mb-12'>
        {dataResult.value.attributes.title}
      </TypographyH1>

      <div className='flex flex-col md:gap-12 gap-8'>
        {dataResult.value.attributes.items.map((item, indx) => (
          <div key={indx} className='w-full lg:w-[70%] md:w-5/6 mx-auto'>
            <h2 className='scroll-m-20 lg:mb-6 mb-4 py-2 text-center font-semibold tracking-tighter lg:text-2xl text-xl text-background bg-primary rounded-xl'>
              {item.day}
            </h2>

            <TimelineHorizontal className='w-full'>
              {item.times.map((timeItem, indxTime) => (
                <TimelineHorizontalItem key={indxTime} title={timeItem.title} time={timeItem.time} />
              ))}
            </TimelineHorizontal>
          </div>
        ))}
      </div>

      {dataResult.value.attributes.description && (
        <article className='prose prose-sm sm:text-sm text-xs sm:[&>*]:leading-5 [&>*]:leading-4 w-full lg:w-[70%] md:w-5/6 mx-auto text-center text-muted-foreground sm:mt-8 mt-6'>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <BlocksRendererStrapi content={dataResult.value.attributes.description} />
        </article>
      )}
    </div>
  )
}
