"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'
import * as XLSX from 'xlsx';

export default function DownloadTableButton({
  table,
  className,
}: {
  table: unknown[],
  className?: string
}) {

  const downloadExcel = (data: unknown[], fileName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <Button 
      className={cn("", className)}
      onClick={() => downloadExcel(table, "Данные пользователей (VII (XXIII) Всероссийский Aрхеологический Cъезд)")}
    >
      Скачать
    </Button>
  )
}
