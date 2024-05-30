import { redirect } from 'next/navigation';
import React from 'react'
import Profile from './content/Profile';
import Data from './content/Data';
import NotFound from '@/components/errors/NotFound';
import Abstracts from './content/Abstracts';
import type { NavigationHrefT } from './Navigation';
import ArrivalDeparture from './content/ArrivalDeparture';
import Fee from './content/Fee';
import Info from './content/Info';
import Programm from './content/Programm';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import { getCurrentUser } from '@/lib/queries/getCurrentUser'
import { MetadataFormT } from '@/lib/types/forms';
import Excursions from './content/Excursions';
import Hotel from './content/Hotel';

export const dynamic = 'force-dynamic'

export default async function AccountPage({ 
  params 
}: { 
  params: { account: string[] | undefined } 
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const currentUser = await getCurrentUser(session.strapiToken!);

  const metadataResult = MetadataFormT.safeParse(currentUser.metadata);

  if (!metadataResult.success) {
    redirect("/onboarding")
  }

  if (!params.account || params.account.length === 0) return (
    <Profile 
      username={currentUser.username} 
      email={currentUser.email}
      metadata={metadataResult.data} 
    />
  )

  switch (params.account[0] as NavigationHrefT) {
    case "":
      return (
        <Profile 
          username={currentUser.username} 
          email={currentUser.email}
          metadata={metadataResult.data} 
        />
      )

    case "data":
      return <Data metadata={(currentUser.metadata as MetadataFormT)} />

    case "abstracts":
      return <Abstracts metadata={metadataResult.data} />

    case "arrival-departure":
      return <ArrivalDeparture metadata={metadataResult.data} />
    
    case "fee":
      return <Fee metadata={metadataResult.data} />
    
    case "info":
      return <Info />

    case "programm":
      return <Programm />

    case "excursions":
      return <Excursions />

    case "hotel":
      return <Hotel />
  
    default:
      return <NotFound goBack />
  }
}