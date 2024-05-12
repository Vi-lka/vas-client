import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1, TypographyH3 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import fetchData from '@/lib/fetchData';
import { MaterialsT } from '@/lib/types/mainPage';
import { cn } from '@/lib/utils';
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

  return (
    <div id='materials' className='container pt-24'>
      <TypographyH1 className='mb-8'>
        Материалы
      </TypographyH1>

      <div className={cn(
        'grid gap-y-6 lg:gap-x-16 md:gap-x-12 gap-x-8',
        dataResult.value.attributes.items.length === 1 
          ? "grid-cols-1" 
          : "grid-cols-1 md:grid-cols-2"
      )}>
        {dataResult.value.attributes.items.map((item, index) => (
          <div key={index} className={cn(
            dataResult.value.attributes.items.length === 1 
              ? "lg:w-1/2 sm:w-5/6 w-full mx-auto"
              : "w-full",
            item.files.length === maxValue ? "row-span-2": "row-span-1"
          )}>
            {item.title && (
              <TypographyH3 className='text-foreground mb-4'>
                {item.title}
              </TypographyH3>
            )}
            <ul className="flex flex-col gap-4">
              {item.files.map((filesItem, filesIndex) => (
                <li key={filesIndex}>
                  <Link href={filesItem.file.data.attributes.url} target="_blank" passHref>
                    <Button variant="secondary" className='flex items-center w-full gap-2 whitespace-normal border font-normal text-base tracking-tighter shadow-md bg-background/90 hover:text-background hover:bg-primary/90 p-6'>
                      <DownloadIcon className='w-8 h-8'/>
                      <p className='flex-1'>{filesItem.title}</p>
                    </Button>
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
