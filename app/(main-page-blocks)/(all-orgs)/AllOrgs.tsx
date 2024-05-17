import ErrorHandler from '@/components/errors/ErrorHandler';
import { getOrgs } from '@/lib/queries/getOrgs';
import React from 'react';
import AllOrgsArray, { AllOrgsItem } from "./AllOrgsArray";
import { TypographyH2 } from '@/components/typography';
import { cn } from '@/lib/utils';

export default async function AllOrgs() {
  
  const [ dataResult ] = await Promise.allSettled([ getOrgs() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Организации"
      notFound={false}
    />
  )

  return (
    <div id='orgs' className='container pt-24'>
      <AllOrgsArray title={
        <TypographyH2 className="my-4 leading-snug lg:text-3xl text-2xl">
          Организаторы
        </TypographyH2>
      }>
        {dataResult.value.attributes.main.map((org, indx) => (
          <AllOrgsItem 
            key={indx} 
            data={org} 
            className={cn(
              "text-base",
              dataResult.value.attributes.main.length >= 1 && "md:w-[calc(33%-1.5rem)] w-full",
              dataResult.value.attributes.main.length >= 3 && "lg:w-[calc(25%-1.5rem)]",
            )}
          />
        ))}
      </AllOrgsArray>

      {dataResult.value.attributes.support.length > 0 && (
        <AllOrgsArray title={
          <TypographyH2 className="my-4 leading-snug lg:text-3xl text-2xl first:mt-12">
            При поддержке
          </TypographyH2>
        }>
          {dataResult.value.attributes.support.map((org, indx) => (
            <AllOrgsItem 
              key={indx} 
              data={org} 
              className={cn(
                "text-sm",
                dataResult.value.attributes.support.length >= 1 && "md:w-[calc(33%-1.5rem)] w-full",
                dataResult.value.attributes.support.length >= 3 && "lg:w-[calc(25%-1.5rem)]",
              )}
            />
          ))}
        </AllOrgsArray>
      )}

      {dataResult.value.attributes.partners.length > 0 && (
        <AllOrgsArray title={
          <TypographyH2 className="my-4 leading-snug lg:text-3xl text-2xl first:mt-12">
            Партнеры
          </TypographyH2>
        }>
          {dataResult.value.attributes.partners.map((org, indx) => (
            <AllOrgsItem 
              key={indx} 
              data={org} 
              className={cn(
                "text-sm",
                dataResult.value.attributes.partners.length >= 1 && "md:w-[calc(33%-1.5rem)] w-full",
                dataResult.value.attributes.partners.length >= 3 && "lg:w-[calc(25%-1.5rem)]",
              )}
            />
          ))}
        </AllOrgsArray>
      )}

      {dataResult.value.attributes.co_organizers.length > 0 && (
        <AllOrgsArray title={
          <TypographyH2 className="my-4 leading-snug lg:text-3xl text-2xl first:mt-12">
            Соорганизаторы
          </TypographyH2>
        }>
          {dataResult.value.attributes.co_organizers.map((org, indx) => (
            <AllOrgsItem 
              key={indx} 
              data={org} 
              className={cn(
                "text-sm",
                dataResult.value.attributes.co_organizers.length >= 1 && "md:w-[calc(33%-1.5rem)] w-full",
                dataResult.value.attributes.co_organizers.length >= 3 && "lg:w-[calc(25%-1.5rem)]",
              )}
            />
          ))}
        </AllOrgsArray>
      )}
    </div>
  )
}
