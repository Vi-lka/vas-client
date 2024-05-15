import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import fetchData from '@/lib/fetchData';
import { DirectionsT } from '@/lib/types/mainPage';
import { notFound } from 'next/navigation';
import React from 'react'
import "./timeline.css";

export default async function Directions() {

    const getDirections = async (): Promise<DirectionsT> => {
        const query = /* GraphGL */ `
        query Directions {
            direction {
                data {
                    attributes {
                        title
                        items { title }
                    }
                }
            }
        }
        `;
      
        const json = await fetchData<{ 
          data: { 
            direction: { 
              data: DirectionsT
            } 
          }; 
        }>({ 
          query, 
          error: "Failed to fetch Directions"
        })
      
        // await new Promise((resolve) => setTimeout(resolve, 2000))
      
        if (json.data.direction.data === null) notFound();
        
        const data = DirectionsT.parse(json.data.direction.data);
        
        return data;
      };
      
      const [ dataResult ] = await Promise.allSettled([ getDirections() ]);
      if (dataResult.status === "rejected") return (
        <ErrorHandler 
          error={dataResult.reason as unknown} 
          place="Направления"
          notFound={false}
        />
      )

    return (
        <div id='directions' className='container pt-24'>
            <TypographyH1 className='mb-12'>
                {dataResult.value.attributes.title}
            </TypographyH1>

            <ul className='timeline'>
                {dataResult.value.attributes.items.map((item, index) => (
                    <li key={index} data-custom-attribute={index + 1}>
                        <div>
                            <h4 className="whitespace-pre-wrap relative top-[-6px] w-fit border font-medium tracking-tight sm:text-lg text-base px-4 py-3 bg-background rounded-lg shadow">
                                {item.title}
                            </h4>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
