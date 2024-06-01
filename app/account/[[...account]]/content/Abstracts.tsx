import BlocksRendererStrapi from '@/components/content-blocks/BlocksRendererStrapi'
import ErrorHandler from '@/components/errors/ErrorHandler'
import AbstractsForm from '@/components/froms/AbstractsForm'
import { TypographyH3 } from '@/components/typography'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import fetchData from '@/lib/fetchData'
import { AbstractsT } from '@/lib/types/content'
import type { MetadataFormT } from '@/lib/types/forms'
import type { StatusEnum } from '@/lib/types/users'
import { DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import Status from './Status'

export default async function Abstracts({
  metadata,
  status,
}: {
  metadata: MetadataFormT,
  status: StatusEnum | null,
}) {

  const hasReport = metadata.report === true

  if (!hasReport) {
    redirect("/account");
  }

  const getAbstracts = async (): Promise<AbstractsT> => {
    const query = /* GraphGL */ `
      query Abstract {
        abstract {
          data {
            attributes {
              text
              file {
                data {
                  attributes { url }
                }
              }
            }
          }
        }
      }
    `;
      
    const json = await fetchData<{ 
      data: { 
        abstract: { 
          data: AbstractsT
        } 
      }; 
    }>({ 
      query,
      error: "Failed to fetch Abstracts"
    })
      
    // await new Promise((resolve) => setTimeout(resolve, 2000))
      
    if (json.data.abstract.data === null) notFound();
        
    const data = AbstractsT.parse(json.data.abstract.data);
        
    return data;
  };
      
  const [ dataResult ] = await Promise.allSettled([ getAbstracts() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Требования к тезисам"
      notFound={false}
    />
  )

  return (
    <div className='w-full'>
      <div className=' flex lg:flex-row flex-col justify-between gap-3'>
        <div className=''>
          <TypographyH3 className='lg:text-2xl md:text-xl text-lg'>Тезисы</TypographyH3>
          <p className='font-medium text-muted-foreground lg:text-lg md:text-base text-sm'>
            Ознакомьтесь с требованиями к оформлению тезисов и отправьте свои
          </p>
        </div>
        <Status report={metadata.report} status={status} />
      </div>
      <div className='mt-12 w-full sm:max-w-3xl max-w-md mx-auto'>
        <AbstractsForm metadata={metadata}/>
      </div>
      <div className='flex flex-col items-center justify-center mt-8'>
        {dataResult.value.attributes.text && (
          <div className='lg:text-base text-sm'>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <BlocksRendererStrapi content={dataResult.value.attributes.text} />
          </div>
        )}
        {dataResult.value.attributes.file.data && (
          <div className='group md:w-1/2 w-full ring-primary/80 hover:ring ring-offset-2 rounded-xl transition-all duration-300 mt-8'>
            <Link href={dataResult.value.attributes.file.data.attributes.url} target="_blank" className='w-full'>
              <Card className='w-full h-full flex flex-col justify-center overflow-hidden'>
                <CardHeader className='pb-6'>
                  <CardTitle className='mb-1'>
                    <DownloadIcon className='w-8 h-8 mx-auto group-hover:translate-y-2 transition-all duration-300'/>
                  </CardTitle>
                  <CardDescription className='font-medium text-center text-card-foreground'>
                    Требования к оформлению тезисов
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
