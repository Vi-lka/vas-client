import { TypographyH3 } from '@/components/typography'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import type { MetadataFormT } from '@/lib/types/forms'
import type { CurrentUserT } from '@/lib/types/users'
import { Building2, MapPin, Phone } from 'lucide-react'
import React from 'react'

export default function Profile({
  user,
}: {
  user: CurrentUserT
}) {

  const username = user.username
  const email = user.email
  const metadata = (user.metadata as MetadataFormT)

  return (
    <div className='w-full'>
      <div className=' flex lg:flex-row flex-col justify-between gap-3'>
        <div className=''>
          <TypographyH3 className='lg:text-2xl md:text-xl text-lg'>{username}</TypographyH3>
          <p className='font-medium text-muted-foreground lg:text-xl md:text-base text-sm break-all'>
            {email}
          </p>
        </div>
        {user.status && (
          <p className=''>
            Статус заявки: <span className='font-medium'>{user.status}</span>
          </p>
        )}
      </div>
      <div className='mt-8 flex flex-col gap-6'>
        <p className='font-medium lg:text-xl md:text-lg text-base'>
          {metadata.report === true ? "С докладом" : "Без доклада (слушатель)"}
        </p>

        <ol className='text-sm flex flex-wrap gap-4'>
          <li className='inline-flex items-center gap-1'>
            <Phone className='w-4 h-4 flex-none'/>
            <p className='break-all lg:break-normal'>{metadata.phone}</p>
          </li>
          <li className='inline-flex items-center gap-1'>
            <MapPin className='w-4 h-4 flex-none'/>
            <p className='break-all lg:break-normal'>{metadata.country + ", " + metadata.city}</p>
          </li>
          {metadata.report === true ? (
            <li className='inline-flex items-center gap-1'>
              <Building2 className='w-4 h-4 flex-none'/>
              <p className='break-all lg:break-normal'>{metadata.organization + ", " + metadata.post}</p>
            </li>
          ) : (
            <li className='inline-flex items-center gap-1'>
              <Building2 className='w-4 h-4 flex-none'/>
              <p className='break-all lg:break-normal'>{metadata.organization}</p>
            </li>
          )}
        </ol>

        {metadata.report === true && (
          <Table>
            <TableBody>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Ученая степень:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs'>{metadata.degree}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Ученое звание:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs'>{metadata.rank}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Формат участия:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs capitalize'>{metadata.format}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Направление:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs'>{metadata.direction}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Название доклада:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs'>{metadata.reportName}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Приглашение:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs flex items-center'>{metadata.invitation ? "Требуется" : "Не требуется"}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Круглые столы:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs flex flex-col gap-2'>
                  {metadata.tables.map((item, indx) => (
                    <p key={indx}>{indx+1}. {item.label}</p>
                  ))}
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
