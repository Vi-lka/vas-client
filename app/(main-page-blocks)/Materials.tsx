import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1, TypographyH3 } from '@/components/typography';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import fetchData from '@/lib/fetchData';
import { MaterialsT } from '@/lib/types/mainPage';
import { cn, maxDifference } from '@/lib/utils';
import fixDanglingPrefix from "@/lib/fixDanglingPrefix";
import { DownloadIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function Materials() {

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

  const filesLengths = dataResult.value.attributes.items.map((item) => {
    return item.files.length
  })

  const maxValue = Math.max(...filesLengths)

  const maxDiff = maxDifference(filesLengths)

  return (
    <div id='materials' className='container pt-24'>
      <TypographyH1 className='mb-8'>
        Материалы
      </TypographyH1>

      <div className={cn(
        'grid gap-y-8 lg:gap-x-16 md:gap-x-12 gap-x-8',
        dataResult.value.attributes.items.length === 1 
          ? "grid-cols-1" 
          : "grid-cols-1 md:grid-cols-2"
      )}>
        {dataResult.value.attributes.items.map((item, index) => (
          <div key={index} className={cn(
            dataResult.value.attributes.items.length === 1 
              ? "lg:w-1/2 sm:w-5/6 w-full mx-auto"
              : "w-full",
            (item.files.length === maxValue) && (maxDiff >= 3) ? "row-span-2": "row-span-1"
          )}>
            {item.title && (
              <TypographyH3 className='text-foreground mb-4'>
                {fixDanglingPrefix(item.title)}
              </TypographyH3>
            )}
            <ul className="grid lg:grid-cols-2 gap-4 auto-rows-fr">
              {item.files.map((filesItem, filesIndex) => (
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
                          <p className='text-xs font-light text-muted-foreground'>{fixDanglingPrefix(filesItem.description)}</p>
                        </CardContent>
                      )}
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
