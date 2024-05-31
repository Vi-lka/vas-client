import { TypographyH2 } from "@/components/typography";
import { redirect } from "next/navigation";
import Navigation from "./Navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getCurrentUser } from '@/lib/queries/getCurrentUser'
import { MetadataFormT } from "@/lib/types/forms";

export const dynamic = 'force-dynamic'

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const currentUser = await getCurrentUser(session.strapiToken!);

  if (!currentUser.metadata) {
    redirect("/onboarding");
  }

  const metadataResult = MetadataFormT.safeParse(currentUser.metadata);

  if (!metadataResult.success) {
    redirect("/onboarding")
  }

  return (
    <main className="container max-w-screen-xl mx-auto pt-28 flex flex-col">
      <div className='w-full mb-8'>
        <TypographyH2 className='border-none mb-1 pb-0'>Аккаунт</TypographyH2>
        <p className='text-sm text-muted-foreground'>Управляйте информацией своей учетной записи</p>
      </div>
      <div className="flex lg:gap-3 gap-1.5 min-h-screen">
        <Navigation className='max-w-60 lg:w-1/3 sticky top-20 h-fit'/>
        <div className="lg:w-2/3 flex-1 py-3 pl-3 border-l">
          {children}
        </div>
      </div>
    </main>
  );
}