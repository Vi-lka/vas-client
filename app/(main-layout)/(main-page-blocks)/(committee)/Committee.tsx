import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography'
import fetchData from '@/lib/fetchData';
import { CommitteeT } from '@/lib/types/mainPage';
import { notFound } from 'next/navigation';
import React from 'react'
import CommitteeItem from './CommitteeItem';

export default async function Committee() {

  const getCommittee = async (): Promise<CommitteeT> => {
    const query = /* GraphGL */ `
      query Committee {
        committee {
          data {
            attributes {
              title
              items {
                title
                persons {
                  title
                  description
                  image {
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
        committee: { 
          data: CommitteeT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Committee"
    })
  
    // await new Promise((resolve) => setTimeout(resolve, 2000))
  
    if (json.data.committee.data === null) notFound();
    
    const data = CommitteeT.parse(json.data.committee.data);
    
    return data;
  };
    
  const [ dataResult ] = await Promise.allSettled([ getCommittee() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Комитет"
      notFound={false}
    />
  )

  return (
    <div id='committee' className='container pt-24'>
      <TypographyH1 className='mb-8'>
        {dataResult.value.attributes.title}
      </TypographyH1>

      {dataResult.value.attributes.items.map((item, indx) => (
        <CommitteeItem key={indx} data={item} className='mb-12' />
      ))}
    </div>
  )
}
