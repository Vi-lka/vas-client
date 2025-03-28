"use client"

import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { UserT } from '@/lib/types/users';
import type { MetadataFormT } from '@/lib/types/forms';
import StatusForm from '@/components/froms/admin/StatusForm';
import { formatDate, translitStatusToNormal } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function TableItem({
  item,
  index
}: {
  item: UserT,
  index: number,
}) {
  const data = item.attributes
  const metadata = data.metadata as MetadataFormT | null
  const hasReport = metadata?.report
  
  return (
    <Dialog key={"item"}>
      <DialogTrigger asChild>
        <TableRow className='cursor-pointer hover:bg-secondary/90 ring-primary/80 hover:ring ring-offset-2 rounded-[0.15rem] transition-all duration-300'>
          <TableHead className='text-center'>{index+1}</TableHead>
          <TableCell>{data.username}</TableCell>
          <TableCell>{data.email}</TableCell>
          <TableCell>{translitStatusToNormal(data.status)}</TableCell>
          <TableCell>{metadata?.phone}</TableCell>
          <TableCell>{hasReport && metadata.format}</TableCell>
          <TableCell>{hasReport && metadata.direction}</TableCell>
          <TableCell>{hasReport && metadata.reportName}</TableCell>
          <TableCell className='text-center'>
            {(hasReport && metadata.reportFile?.url) && (
              <Link href={metadata.reportFile.url} target='__blank' passHref>
                <Button variant="secondary" className='' onClick={(e) => e.stopPropagation()}>
                  Скачать
                </Button>
              </Link>
            )}
          </TableCell>
          <TableCell className='text-center'>
            {(hasReport && metadata.imageFile?.url) && (
              <Link href={metadata.imageFile.url} target='__blank' passHref>
                <Image
                  width={150}
                  height={150}
                  alt={metadata.imageFile.url}
                  src={metadata.imageFile.url}
                  className='ring-ring hover:ring ring-offset-2 transition-all duration-300 rounded-md object-contain mx-auto'
                  onClick={(e) => e.stopPropagation()}
                />
              </Link>
            )}
          </TableCell>
          <TableCell className='text-center'>
            {(hasReport && metadata.additionalReports) && (
              <Dialog key={"additionalReports"}>
                <DialogTrigger asChild>
                  <Button 
                    variant="secondary" 
                    className=''
                    onClick={(e) => e.stopPropagation()}
                  >
                    Открыть
                  </Button>
                </DialogTrigger>
                <DialogContent className=' max-w-[90vw]'>
                  <DialogHeader>
                    <DialogTitle>Доп. доклады:</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className='max-h-[70vh]'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className='min-w-48'>Направление</TableHead>
                          <TableHead className='min-w-52'>Название доклада</TableHead>
                          <TableHead className='min-w-24 text-center'>Тезисы</TableHead>
                          <TableHead className='min-w-32 text-center'>Иллюстрация</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {metadata.additionalReports.map((additionalReport, indx) => (
                          <TableRow key={indx}>
                            <TableCell>{additionalReport.direction}</TableCell>
                            <TableCell>{additionalReport.reportName}</TableCell>
                            <TableCell className='text-center'>
                              {(additionalReport.reportFile?.url) && (
                                <Link href={additionalReport.reportFile.url} target='__blank' passHref>
                                  <Button variant="secondary" className=''>
                                    Скачать
                                  </Button>
                                </Link>
                              )}
                            </TableCell>
                            <TableCell className='text-center'>
                              {(additionalReport.imageFile?.url) && (
                                <Link href={additionalReport.imageFile.url} target='__blank' passHref>
                                  <Image
                                    width={100}
                                    height={100}
                                    alt={additionalReport.imageFile.url}
                                    src={additionalReport.imageFile.url}
                                    className='ring-ring hover:ring ring-offset-2 transition-all duration-300 rounded-md object-contain mx-auto'
                                  />
                                </Link>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            )}
          </TableCell>
          <TableCell>{data.createdAt && formatDate(data.createdAt, {hour: "numeric", minute: "numeric"})}</TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.username}</DialogTitle>
          <DialogDescription>{data.email}</DialogDescription>
        </DialogHeader>
        <StatusForm 
          userId={item.id}
          defaultStatus={data.status} 
          defaultComment={data.statusComment} 
        />
      </DialogContent>
    </Dialog>
  )
}
