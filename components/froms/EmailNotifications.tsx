"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Switch } from '../ui/switch'

type EmailNotificationsProps = {
  content: boolean,
  onContentChange: (checked: boolean) => void,
  className?: string,
} & (EmailNotificationsShowReportProps | EmailNotificationsNotShowReportProps)

type EmailNotificationsShowReportProps = {
  showReportSwitch: true,
  report: boolean,
  onReportChange: (checked: boolean) => void,
}

type EmailNotificationsNotShowReportProps = {
  showReportSwitch?: false,
}

export default function EmailNotifications(props: EmailNotificationsProps) {
  return (
    <div className={cn("", props.className)}>
      <h3 className="mb-3 text-base font-medium text-center">Email Уведомления</h3>
      <div className="space-y-3">
        <Card>
          <CardHeader className="flex flex-row md:gap-8 gap-1 items-center justify-between">
            <div className="space-y-0.5">
              <CardTitle className='font-medium'>Контент</CardTitle>
              <CardDescription className='text-xs'>
                {"Получайте электронные письма о\u00A0новых материалах, изменениях в\u00A0программе или\u00A0направлениях и\u00A0о\u00A0многом другом."}
              </CardDescription>
            </div>
            <Switch
              size="md"
              checked={props.content}
              onCheckedChange={props.onContentChange}
            />
          </CardHeader>
        </Card>

        {props.showReportSwitch && (
          <Card>
            <CardHeader className="flex flex-row md:gap-8 gap-1 items-center justify-between">
              <div className="space-y-0.5">
                <CardTitle className='font-medium'>Заявка</CardTitle>
                <CardDescription className='text-xs'>
                  {"Получайте электронные письма о\u00A0статусе вашей заявки."}
                </CardDescription>
              </div>
              <Switch
                size="md"
                checked={props.report}
                onCheckedChange={props.onReportChange}
              />
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  )
}
