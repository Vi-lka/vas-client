"use client"

import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import type { UserT } from '@/lib/types/users';
import type { MetadataFormT } from '@/lib/types/forms';
import StatusForm from '@/components/froms/admin/StatusForm';
import { translitStatusToNormal } from '@/lib/utils';

export default function TableItem({
  item
}: {
  item: UserT,
}) {
  const data = item.attributes
  const metadata = data.metadata as MetadataFormT | null
  const hasReport = metadata?.report
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow className='cursor-pointer hover:bg-secondary/90 ring-primary/80 hover:ring ring-offset-2 rounded-[0.15rem] transition-all duration-300'>
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
