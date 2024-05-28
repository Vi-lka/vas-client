import { currentUser } from '@clerk/nextjs/server';
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

export const dynamic = 'force-dynamic'

export default async function AccountPage({ 
  params 
}: { 
  params: { account: string[] | undefined } 
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (!params.account || params.account.length === 0) return <Profile user={user} />

  switch (params.account[0] as NavigationHrefT) {
    case "":
      return <Profile user={user} />

    case "data":
      return <Data user={user} />

    case "abstracts":
      return <Abstracts user={user} />

    case "arrival-departure":
      return <ArrivalDeparture user={user} />
    
    case "fee":
      return <Fee user={user} />
    
    case "info":
      return <Info />

    case "programm":
      return <Programm />
  
    default:
      return <NotFound goBack />
  }
}