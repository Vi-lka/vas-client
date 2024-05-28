import { TypographyH3 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import type { MetadataFormT } from '@/lib/types/forms'
import type { User } from '@clerk/nextjs/server'
import { Building2, MapPin, Phone, SquarePen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Profile({
  user
}: {
  user: User
}) {

  const userMetadata = (user.unsafeMetadata as MetadataFormT)

  const hasReport = userMetadata.report === true

  const userName = user.lastName + " " + user.firstName + " " + userMetadata.middleName

  return (
    <div className='w-full'>
      <TypographyH3 className='lg:text-2xl md:text-xl text-lg'>{userName}</TypographyH3>
      <p className='font-medium text-muted-foreground lg:text-xl md:text-base text-sm break-all'>
        {user.primaryEmailAddress?.emailAddress}
      </p>
      <div className='mt-8 flex flex-col gap-6'>
        <p className='font-medium lg:text-xl md:text-lg text-base'>
          {hasReport ? "С докладом" : "Без доклада (слушатель)"}
        </p>

        <ol className='text-sm flex flex-wrap gap-4'>
          <li className='inline-flex items-center gap-1'>
            <Phone className='w-4 h-4 flex-none'/>
            <p className='break-all lg:break-normal'>{userMetadata.phone}</p>
          </li>
          <li className='inline-flex items-center gap-1'>
            <MapPin className='w-4 h-4 flex-none'/>
            <p className='break-all lg:break-normal'>{userMetadata.country + ", " + userMetadata.city}</p>
          </li>
          {hasReport ? (
            <li className='inline-flex items-center gap-1'>
              <Building2 className='w-4 h-4 flex-none'/>
              <p className='break-all lg:break-normal'>{userMetadata.organization + ", " + userMetadata.post}</p>
            </li>
          ) : (
            <li className='inline-flex items-center gap-1'>
              <Building2 className='w-4 h-4 flex-none'/>
              <p className='break-all lg:break-normal'>{userMetadata.organization}</p>
            </li>
          )}
        </ol>

        {hasReport && (
          <Table>
            <TableBody>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Ученая степень:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs'>{userMetadata.degree}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Ученое звание:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs'>{userMetadata.rank}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Формат участия:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs capitalize'>{userMetadata.format}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Направление:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs'>{userMetadata.direction}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Название доклада:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs'>{userMetadata.reportName}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Приглашение:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs flex items-center'>{userMetadata.invitation ? "Требуется" : "Не требуется"}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Гостиница:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs flex items-center'>{userMetadata.hotel ? "Требуется" : "Не требуется"}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Круглые столы:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs flex flex-col gap-2'>
                  {userMetadata.tables.map((item, indx) => (
                    <p key={indx}>{indx+1}. {item.label}</p>
                  ))}
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        )}

        <Link href="/account/data" passHref className='w-fit h-fit mr-0 ml-auto'>
          <Button className='font-medium shadow text-sm md:px-6 md:py-5 px-4 py-4 gap-2 border bg-background text-foreground hover:text-background'>
            <SquarePen className='md:w-5 md:h-5 w-4 h-4'/>Редактировать
          </Button>
        </Link>
      </div>
    </div>
  )
}
