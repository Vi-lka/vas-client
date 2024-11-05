import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import SearchField from '@/components/filters/SearchField'
import { TypographyH4 } from '@/components/typography'
import { getAllUsers } from '@/lib/queries/getAllUsers';
import { getCurrentUser } from '@/lib/queries/getCurrentUser';
import type { StatusTranslitEnum } from '@/lib/types/users';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import Filters from './Filters';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import PaginationControls from '@/components/PaginationControls';
import TableItem from './TableItem';

const DEFAULT_PAGE_SIZE = 20

export default async function StatusPage({
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
  const status = searchParams["status"] as StatusTranslitEnum | undefined;

  return (
    <div className='w-full mt-6 md:px-8 px-6 pb-8 overflow-hidden'>
      <TypographyH4 className='border-none mb-3 pb-0'>Статус заявки</TypographyH4>

      <Filters className='float-start sm:float-none mb-3' />

      <SearchField placeholder="Поиск по ФИО..." param='search' className='mb-3' />

      <div className='mt-6 [&>div]:px-2 [&>div]:py-1'>
        <Suspense 
          key={`${search}${sort}${page}${pageSize}${status}`}
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
  const status = searchParams["status"] as StatusTranslitEnum | undefined;

  const [ dataResult ] = await Promise.allSettled([ 
    getAllUsers({
      token,
      search,
      sort,
      page: Number(page),
      pageSize: Number(pageSize),
      report: true,
      confirmed: true,
      status,
      subscribedReport: true,
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
    <Table key={`${search}${sort}${page}${pageSize}${status}`}>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>№</TableHead>
          <TableHead className='min-w-48'>ФИО</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className='min-w-32 text-center'>Статус заявки</TableHead>
          <TableHead>Телефон</TableHead>
          <TableHead className='min-w-36 text-center'>Формат участия</TableHead>
          <TableHead className='min-w-48'>Направление</TableHead>
          <TableHead className='min-w-52'>Название доклада</TableHead>
          <TableHead className='min-w-24 text-center'>Тезисы</TableHead>
          <TableHead className='min-w-32 text-center'>Иллюстрация</TableHead>
          <TableHead className='min-w-32'>Доп. доклады</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataResult.value.data.map((item, indx) => (
          <TableItem key={indx} index={indx} item={item} />
        ))}
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