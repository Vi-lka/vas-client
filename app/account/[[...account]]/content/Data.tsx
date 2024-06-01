import MetadataForm from '@/components/froms/MetadataForm'
import { TypographyH3 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import type { MetadataFormT } from '@/lib/types/forms'
import type { StatusEnum } from '@/lib/types/users'
import { SquarePen } from 'lucide-react'
import React from 'react'
import Status from './Status'

export default function Data({
  metadata,
  status,
  fileUrl,
  imageUrl
}: {
  metadata: MetadataFormT,
  status: StatusEnum | null,
  fileUrl?: string,
  imageUrl?: string,
}) {

  const hasReport = metadata.report === true

  return (
    <div className='w-full'>
      <div className=' flex lg:flex-row flex-col justify-between gap-3'>
        <div className=''>
          <TypographyH3 className='lg:text-2xl md:text-xl text-lg'>Заявка</TypographyH3>
          <p className='font-medium text-muted-foreground lg:text-lg md:text-base text-sm'>
            {hasReport ? "Вы зарегистрированы с докладом" : "Вы зарегистрированы без доклада (слушатель)"}
          </p>
        </div>
        <Status report={metadata.report} status={status} />
      </div>
      <div className='mt-8'>
        <Card className='w-full sm:max-w-3xl max-w-md mx-auto md:block hidden'>
          <CardHeader>
            <CardTitle className='text-center lg:text-2xl text-xl whitespace-pre-wrap'>Редактировать данные</CardTitle>
            <CardDescription className='text-center'>
              Выберите как вы хотите участвовать:
              <br/> 
              <span className='font-semibold'>с докладом</span> или <span className='font-semibold'>без (слушатель) </span>
              и заполните данные
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MetadataForm
              defaultValues={metadata} 
              defaultFileUrl={fileUrl}
              defaultImageUrl={imageUrl}
              defaultTab={hasReport ? "report" : "no-report"}
            />
          </CardContent>
        </Card>


        <div className='mt-8 md:hidden flex flex-col gap-6'>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='font-medium shadow text-sm md:px-6 md:py-5 px-4 py-4 gap-2 border bg-background text-foreground hover:text-background'>
                <SquarePen className='md:w-5 md:h-5 w-4 h-4'/>Редактировать
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='text-center lg:text-2xl text-xl whitespace-pre-wrap'>Редактировать данные</DialogTitle>
                <DialogDescription className='text-center'>
                  Выберите как вы хотите участвовать:
                  <br/> 
                  <span className='font-semibold'>с докладом</span> или <span className='font-semibold'>без (слушатель) </span>
                  и заполните данные
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[50vh] w-full">
                <div className='w-full h-full p-1'>
                  <MetadataForm
                    defaultValues={metadata} 
                    defaultFileUrl={fileUrl}
                    defaultImageUrl={imageUrl}
                    defaultTab={hasReport ? "report" : "no-report"}
                  />
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          <Table>
            <TableBody>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">ФИО:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs'>
                  {metadata.familyName + " " + metadata.name + " " + metadata.middleName}
                </TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Телефон:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs'>{metadata.phone}</TableCell>
              </TableRow>
              <TableRow className='flex w-full md:flex-row flex-col'>
                <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Страна, Город:</TableCell>
                <TableCell className='flex-1 lg:text-sm text-xs'>{metadata.country + ", " + metadata.city}</TableCell>
              </TableRow>
              {metadata.report === true 
                ? (<>
                  <TableRow className='flex w-full md:flex-row flex-col'>
                    <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Организация, Должность:</TableCell>
                    <TableCell className='flex-1 lg:text-sm text-xs'>{metadata.organization + ", " + metadata.post}</TableCell>
                  </TableRow>
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
                    <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Тезисы:</TableCell>
                    <TableCell className='flex-1 lg:text-sm text-xs flex items-center'>{fileUrl ? fileUrl.split("/")[2] : "__"}</TableCell>
                  </TableRow>
                  <TableRow className='flex w-full md:flex-row flex-col'>
                    <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Иллюстрация:</TableCell>
                    <TableCell className='flex-1 lg:text-sm text-xs flex items-center'>{imageUrl ? imageUrl.split("/")[2] : "__"}</TableCell>
                  </TableRow>
                  <TableRow className='flex w-full md:flex-row flex-col'>
                    <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Круглые столы:</TableCell>
                    <TableCell className='flex-1 lg:text-sm text-xs flex flex-col gap-2'>
                      {metadata.tables.map((item, indx) => (
                        <p key={indx}>{indx+1}. {item.label}</p>
                      ))}
                    </TableCell>
                  </TableRow>
                  <TableRow className='flex w-full md:flex-row flex-col'>
                    <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Комментарии:</TableCell>
                    <TableCell className='flex-1 lg:text-sm text-xs'>
                      <article className='prose prose-sm whitespace-pre-wrap !text-foreground'>
                        {metadata.comment}
                      </article>
                    </TableCell>
                  </TableRow>
                </>)
                : (<>
                  <TableRow className='flex w-full md:flex-row flex-col'>
                    <TableCell className="font-semibold md:w-[9.5rem] md:pb-2 pb-0">Организация:</TableCell>
                    <TableCell className='flex-1 lg:text-sm text-xs'>{metadata.organization}</TableCell>
                  </TableRow>
                </>)
              }
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  )
}
