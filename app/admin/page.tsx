import { getServerSession } from 'next-auth';
import React, { Suspense } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/queries/getCurrentUser';
import { TypographyH4 } from '@/components/typography';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAllUsers } from '@/lib/queries/getAllUsers';
import ErrorHandler from '@/components/errors/ErrorHandler';
import type { StatusTranslitEnum } from '@/lib/types/users';
import type { MetadataFormT } from '@/lib/types/forms';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getShortText, translitStatusToNormal } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import DownloadCSV from './DownloadCSV';
import PaginationControls from '@/components/PaginationControls';
import Filters from './Filters';
import SearchField from '@/components/filters/SearchField';

const DEFAULT_PAGE_SIZE = 20

export default async function AdminPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.strapiToken) {
    redirect("/sign-in");
  }

  const currentUser = await getCurrentUser(session.strapiToken);

  if (currentUser.role?.type !== "admin") {
    redirect("/account")
  }

  const search = searchParams["search"] as string | undefined;
  const sort = searchParams["sort"] as string | undefined;
  const page = searchParams["page"] ?? "1";
  const pageSize = searchParams["per"] ?? DEFAULT_PAGE_SIZE;
  const report = searchParams["report"] as string | undefined;
  const confirmed = searchParams["confirmed"] as string | undefined;
  const status = searchParams["status"] as StatusTranslitEnum | undefined;
  const subscribedContent = searchParams["subscribedContent"] as string | undefined;
  const subscribedReport = searchParams["subscribedReport"] as string | undefined;
  const metadata = searchParams["metadata"] as string | undefined;

  return (
    <div className='w-full mt-6 md:px-8 px-6 pb-8 overflow-hidden'>
      <TypographyH4 className='border-none mb-3 pb-0'>Данные участников</TypographyH4>
      <Suspense 
        key={`${search}${report}${confirmed}${status}${subscribedContent}${subscribedReport}${metadata}`}
        fallback={"Loading..."}
      >
        <DownloadCSV token={session.strapiToken} searchParams={searchParams} className="mb-3 ml-3 float-end" />
      </Suspense>

      <Filters className='float-start sm:float-none mb-3' />

      <SearchField placeholder="Поиск по ФИО..." param='search' className='mb-3' />

      <div className='mt-6'>
        <Suspense 
          key={`${search}${sort}${page}${pageSize}${report}${confirmed}${status}${subscribedContent}${subscribedReport}${metadata}`} 
          fallback={"Loading..."}
        >
          <DataTable token={session.strapiToken} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}

async function DataTable({
  token,
  searchParams
}: {
  token: string,
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const search = searchParams["search"] as string | undefined;
  const sort = searchParams["sort"] as string | undefined;
  const page = searchParams["page"] ?? "1";
  const pageSize = searchParams["per"] ?? DEFAULT_PAGE_SIZE;
  const report = searchParams["report"] as string | undefined;
  const confirmed = searchParams["confirmed"] as string | undefined;
  const status = searchParams["status"] as StatusTranslitEnum | undefined;
  const subscribedContent = searchParams["subscribedContent"] as string | undefined;
  const subscribedReport = searchParams["subscribedReport"] as string | undefined;
  const metadata = searchParams["metadata"] as string | undefined;

  const [ dataResult ] = await Promise.allSettled([ 
    getAllUsers({
      token,
      search,
      sort,
      page: Number(page),
      pageSize: Number(pageSize),
      report: report
        ? report === "true" ? true : false
        : undefined,
      confirmed: confirmed
        ? confirmed === "true" ? true : false
        : undefined,
      status,
      subscribedContent: subscribedContent
        ? subscribedContent === "true" ? true : false
        : undefined,
      subscribedReport: subscribedReport
        ? subscribedReport === "true" ? true : false
        : undefined,
      metadata: metadata
        ? metadata === "true" ? true : false
        : undefined,
    }) 
  ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Пользователи"
      notFound
      goBack={false}
    />
  )

  return (
  <>
    <p className='mb-3 text-sm'>Всего: {dataResult.value.meta.pagination.total}</p>
    <Table key={`${search}${sort}${page}${pageSize}${report}${confirmed}${status}${subscribedContent}${subscribedReport}${metadata}`}>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>№</TableHead>
          <TableHead className='min-w-48'>ФИО</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className='min-w-40 text-center'>Подтвержден Email</TableHead>
          <TableHead className='min-w-28 text-center'>С докладом</TableHead>
          <TableHead className='min-w-32 text-center'>Статус заявки</TableHead>
          <TableHead>Телефон</TableHead>
          <TableHead className='min-w-24'>Страна</TableHead>
          <TableHead className='min-w-24'>Город</TableHead>
          <TableHead className='min-w-32'>Ученая степень</TableHead>
          <TableHead className='min-w-32'>Ученое звание</TableHead>
          <TableHead className='min-w-32'>Организация</TableHead>
          <TableHead className='min-w-32'>Должность</TableHead>
          <TableHead className='min-w-36 text-center'>Формат участия</TableHead>
          <TableHead className='min-w-24 text-center'>Требуется приглашение</TableHead>
          <TableHead className='min-w-48'>Направление</TableHead>
          <TableHead className='min-w-52'>Название доклада</TableHead>
          <TableHead className='min-w-24 text-center'>Тезисы</TableHead>
          <TableHead className='min-w-32 text-center'>Иллюстрация</TableHead>
          <TableHead className='min-w-32'>Доп. доклады</TableHead>
          <TableHead className='min-w-52'>Круглые столы</TableHead>
          <TableHead className='min-w-40'>Комментарии</TableHead>
          <TableHead className='min-w-40 text-center'>Email Уведомления (Контент)</TableHead>
          <TableHead className='min-w-40 text-center'>Email Уведомления (Заявка)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataResult.value.data.map((item, indx) => {
          const data = item.attributes
          const metadata = data.metadata as MetadataFormT | null
          const hasReport = metadata?.report
          return (
            <TableRow key={indx}>
              <TableHead className='text-center'>{indx+1}</TableHead>
              <TableCell>{data.username}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.confirmed ? "Да" : "Нет"}</TableCell>
              <TableCell>{data.report ? "Да" : "Нет"}</TableCell>
              <TableCell>{translitStatusToNormal(data.status)}</TableCell>
              <TableCell>{metadata?.phone}</TableCell>
              <TableCell>{metadata?.country}</TableCell>
              <TableCell>{metadata?.city}</TableCell>
              <TableCell>{hasReport && metadata.degree}</TableCell>
              <TableCell>{hasReport && metadata.rank}</TableCell>
              <TableCell>{hasReport && metadata.organization}</TableCell>
              <TableCell>{hasReport && metadata.post}</TableCell>
              <TableCell>{hasReport && metadata.format}</TableCell>
              <TableCell>{hasReport && (metadata.invitation ? "Да" : "Нет")}</TableCell>
              <TableCell>{hasReport && metadata.direction}</TableCell>
              <TableCell>{hasReport && metadata.reportName}</TableCell>
              <TableCell className='text-center'>
                {(hasReport && metadata.reportFile?.url) && (
                  <Link href={metadata.reportFile.url} target='__blank' passHref>
                    <Button variant="secondary" className=''>
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
                    />
                  </Link>
                )}
              </TableCell>
              <TableCell className='text-center'>
                {(hasReport && metadata.additionalReports) && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" className=''>Открыть</Button>
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
              <TableCell className='text-xs'>
                {(hasReport && metadata.tables) && (
                  <div className='flex flex-col gap-0.5'>
                    {metadata.tables.map((table, indx) => (
                      <p key={indx} className=''>{table.value}</p>
                    ))}
                  </div>
                )}
              </TableCell>
              <TableCell className='text-xs'>
                {(hasReport && metadata.comment) && (
                  <Dialog>
                    <DialogTrigger className='text-left hover:bg-secondary/90 ring-primary/80 hover:ring ring-offset-2 transition-all duration-300 rounded-md'>
                      {getShortText(metadata.comment, 10)}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Комментарии:</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className='max-h-[70vh]'>
                        <article className='prose prose-sm whitespace-pre-wrap !text-foreground'>
                          {metadata.comment}
                        </article>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                )}
              </TableCell>
              <TableCell>{data.subscribedContent ? "Да" : "Нет"}</TableCell>
              <TableCell>{data.subscribedReport ? "Да" : "Нет"}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>

    <div className="mt-6">
      <PaginationControls
        length={dataResult.value.meta.pagination.total}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        pageParam='page'
        perParam='per'
      />
    </div>
  </>
  )
}
