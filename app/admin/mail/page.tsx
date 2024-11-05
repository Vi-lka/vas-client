import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import EmailForm from '@/components/froms/admin/EmailForm';
import { TypographyH4 } from '@/components/typography';
import { getCurrentUser } from '@/lib/queries/getCurrentUser';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function MailPage() {

  const session = await getServerSession(authOptions);
  if (!session || !session.strapiToken) {
    redirect("/sign-in");
  }

  const currentUser = await getCurrentUser(session.strapiToken);

  if (currentUser.role?.type !== "admin") {
    redirect("/account")
  }

  return (
    <div className='w-full mt-6 md:px-8 px-6 pb-8 overflow-hidden'>
      <TypographyH4 className='border-none mb-3 pb-0'>Почта</TypographyH4>
      <EmailForm />
    </div>
  )
}
