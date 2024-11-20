/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import BlocksRendererStrapi from '@/components/content-blocks/BlocksRendererStrapi';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Sonner } from '@/components/ui/sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { hideNotificationAtom } from '@/lib/atoms';
import { useAtom } from 'jotai';
import { EyeOff, MessageSquareWarning, X } from 'lucide-react';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

export default function NotificationClient({
  title,
  description
}: {
  title: string | null;
  description: any;
}) {

  const [hideNotification, setHideNotification] = useAtom(hideNotificationAtom)

  useEffect(() => {
    const hidenNotification = localStorage.getItem("hidenNotification")
    const currentNotification = JSON.stringify({title, description})
    const isSameNotification = hidenNotification === currentNotification

    if (!hideNotification && !isSameNotification) {
      toast.custom(
        (t) => (
          <Alert className='relative font-Inter'>
            <MessageSquareWarning className="h-5 w-5" />
            <AlertTitle className='text-base font-semibold'>{title}</AlertTitle>
            <AlertDescription>
              <BlocksRendererStrapi content={description} />
            </AlertDescription>
            <Button 
              variant="ghost"
              onClick={() => {
                toast.dismiss(t)
                setHideNotification(true)
              }}
              className='absolute top-0 right-0 w-fit h-fit !p-2 m-1'
            >
              <X className='w-4 h-4'/>
            </Button>
            <div className='absolute md:-right-4 lg:-bottom-4 -right-2 -bottom-6 flex items-center justify-end'>
              <TooltipProvider delayDuration={200} skipDelayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="default" 
                      className='p-1.5 h-fit flex gap-1'
                      onClick={() => {
                        toast.dismiss(t)
                        setHideNotification(true)
                        localStorage.setItem("hidenNotification", JSON.stringify({title, description}))
                      }}
                    >
                      <EyeOff className='w-5 h-5' /> 
                      <span className='text-xs lg:hidden block'>Скрыть</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='left' sideOffset={6} className='lg:block hidden'>
                    <p>Скрыть навсегда</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Alert>
        ),
        {
          onDismiss() {
            setHideNotification(true)
          },
          onAutoClose() {
            setHideNotification(true)
          },
        }
      );
    }
  }, [title, description, hideNotification, setHideNotification])

  return (
    <Sonner 
      position='top-center' 
      duration={60000} 
      visibleToasts={1} 
      offset={"10%"} 
      pauseWhenPageIsHidden 
      className='w-5/6' 
    />
  )
}
