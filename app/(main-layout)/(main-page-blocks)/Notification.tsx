/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ErrorHandler from '@/components/errors/ErrorHandler';
import fetchData from '@/lib/fetchData';
import { NotificationT } from '@/lib/types/mainPage';
import { notFound } from 'next/navigation';
import React from 'react'
import NotificationClient from './Notification.client';

export default async function Notification() {
  const getNotification = async (): Promise<NotificationT> => {
    const query = /* GraphGL */ `
      query Notification {
        notification {
          data {
            attributes {
              title
              description
            }
          }
        }
      }
    `;
  
    const json = await fetchData<{ 
      data: { 
        notification: { 
          data: NotificationT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch About"
    })
  
    // await new Promise((resolve) => setTimeout(resolve, 2000))
  
    if (json.data.notification.data === null) notFound();
    
    const data = NotificationT.parse(json.data.notification.data);
    
    return data;
  };

  const [ dataResult ] = await Promise.allSettled([ getNotification() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Оповещение"
      notFound={false}
    />
  )

  if (!dataResult.value) return  null

  return (
    <NotificationClient 
      title={dataResult.value.attributes.title} 
      description={dataResult.value.attributes.description}
    />
  )
}
