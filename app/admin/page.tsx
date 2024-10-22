import { getServerSession } from 'next-auth';
import React, { Suspense } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/queries/getCurrentUser';
import { TypographyH4 } from '@/components/typography';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  const currentUser = await getCurrentUser(session.strapiToken!);

  if (currentUser.role?.type !== "admin") {
    redirect("/account")
  }

  return (
    <div className='w-full mt-6 md:px-8 px-6 overflow-hidden'>
      <TypographyH4 className='border-none mb-1 pb-0'>Данные участников</TypographyH4>
      <div className='mt-6'>
        <Suspense fallback={"Loading..."}>
          <DataTable />
        </Suspense>
      </div>
    </div>
  )
}

function DataTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
