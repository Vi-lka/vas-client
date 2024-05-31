import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH3 } from '@/components/typography'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import fetchData from '@/lib/fetchData';
import { MaterialsT } from '@/lib/types/mainPage';
import { DownloadIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function Info() {

  const getMaterials = async (): Promise<MaterialsT> => {
    const query = /* GraphGL */ `
      query Materials {
        material {
          data {
            attributes {
              items {
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
    `;
  
    const json = await fetchData<{ 
      data: { 
        material: { 
          data: MaterialsT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Materials"
    })
  
    // await new Promise((resolve) => setTimeout(resolve, 2000))
  
    if (json.data.material.data === null) notFound();
    
    const data = MaterialsT.parse(json.data.material.data);
    
    return data;
  };
  
  const [ dataResult ] = await Promise.allSettled([ getMaterials() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Материалы"
      notFound={false}
    />
  )

  return (
    <div className='w-full'>
      <TypographyH3 className='lg:text-2xl md:text-xl text-lg'>Информационные письма</TypographyH3>
      <p className='font-medium text-muted-foreground lg:text-lg md:text-base text-sm'>
      </p>
      <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 auto-rows-fr mt-8">
        {dataResult.value.attributes.items[0].files.map((filesItem, filesIndex) => (
          <li key={filesIndex} className='group w-full h-full ring-primary/80 hover:ring ring-offset-2 rounded-xl transition-all duration-300'>
            <Link href={filesItem.file.data.attributes.url} target="_blank" className='w-full h-full'>
              <Card className='w-full h-full flex flex-col justify-center overflow-hidden'>
                <CardHeader className='pb-2'>
                  <CardTitle className='mb-1'>
                    <DownloadIcon className='w-8 h-8 mx-auto group-hover:translate-y-2 transition-all duration-300'/>
                  </CardTitle>
                  <CardDescription className='font-medium text-center text-card-foreground'>{filesItem.title}</CardDescription>
                </CardHeader>
                {filesItem.description && (
                  <CardContent className='pt-0 text-center'>
                    <p className='text-xs font-light text-muted-foreground'>{filesItem.description}</p>
                  </CardContent>
                )}
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
