import DynamicZone from '@/components/content-blocks/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import fetchData from '@/lib/fetchData';
import { AdditionalPageT } from '@/lib/types/additionalPage';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function AdditionalPage({ 
  params: { slug }
}: { 
  params: { slug: string },
}) {

  const getAdditionalPage = async (): Promise<AdditionalPageT> => {
    const query = /* GraphGL */ `
      query AdditionalPages($filters: AdditionalPageFiltersInput) {
        additionalPages(filters: $filters) {
          data {
            attributes {
              title
              slug
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
        additionalPages: { 
          data: AdditionalPageT[]
        } 
      }; 
    }>({ 
      query,
      variables: {
        filters: {
          slug: { eqi: slug }
        }
      },
      error: "Failed to fetch AdditionalPage"
    })
      
    // await new Promise((resolve) => setTimeout(resolve, 2000))
      
    if ((json.data.additionalPages.data === null) || (json.data.additionalPages.data.length === 0)) notFound();
        
    const data = AdditionalPageT.parse(json.data.additionalPages.data[0]);
        
    return data;
  };
      
  const [ dataResult ] = await Promise.allSettled([ getAdditionalPage() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Страница"
      notFound
      goBack
    />
  )

  return (
    <main className="flex min-h-screen max-w-screen-xl mx-auto flex-col items-center justify-between pt-24">
      <div className='xl:w-3/5 lg:w-2/3 md:w-[70%] sm:w-3/4 w-5/6 mx-auto sm:px-8 px-2 pt-8'>
        <TypographyH1 className='mb-8'>
          {dataResult.value.attributes.title}
        </TypographyH1>
        
        <div className='flex flex-col gap-8'>
          {dataResult.value.attributes.content.map((item, indx) => (
            <DynamicZone key={indx} item={item} />
          ))}
        </div>
      </div>
    </main>
  )
}
