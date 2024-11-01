"use client"

import { Button } from '@/components/ui/button'
import { cn, downloadCSV } from '@/lib/utils'
import React from 'react'

export default function DownloadCSVButton({
  csvString,
  className,
}: {
  csvString: string,
  className?: string
}) {
  return (
    <Button 
      className={cn("", className)}
      onClick={() => downloadCSV(csvString, "Данные пользователей (VII (XXIII) Всероссийский Aрхеологический Cъезд)")}
    >
      Скачать CSV
    </Button>
  )
}
