import { redirect } from 'next/navigation';
import React from 'react'
import Profile from './content/profile/Profile';
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
  if (!session || !session.strapiToken) {
    redirect("/sign-in");
  }

  const currentUser = await getCurrentUser(session.strapiToken);

  const metadataResult = MetadataFormT.safeParse(currentUser.metadata);
  
  if (currentUser.role?.type === "admin") {
    redirect("/admin")
  }

  if (!metadataResult.success) {
    redirect("/onboarding")
  }

  if (!params.account || params.account.length === 0) return (
    <Profile user={currentUser}/>
  )

  const file = currentUser.file.data && (currentUser.metadata as MetadataFormT).reportFile
    ? {
      id: currentUser.file.data.id,
      url: (currentUser.metadata as MetadataFormT).reportFile!.url
    } : undefined

  const image = currentUser.image.data && (currentUser.metadata as MetadataFormT).imageFile
    ? {
      id: currentUser.image.data.id,
      url: (currentUser.metadata as MetadataFormT).imageFile!.url
    } : undefined

  switch (params.account[0] as NavigationHrefT) {
    case "":
      return (
        <Profile user={currentUser}/>
      )

    case "data":
      return (
        <Data 
          metadata={(currentUser.metadata as MetadataFormT)} 
          status={currentUser.status}
          file={file}
          image={image}
        />
      )

    case "abstracts":
      return (
        <Abstracts 
          metadata={metadataResult.data} 
          status={currentUser.status}
          fileId={file?.id}
          imageId={image?.id}
        />
      )

    case "arrival-departure":
      return <ArrivalDeparture metadata={metadataResult.data} />
    
    case "fee":
      return <Fee />
    
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