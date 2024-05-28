import { TypographyH2 } from "@/components/typography";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navigation from "./Navigation";

export const dynamic = 'force-dynamic'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  if (!sessionClaims?.metadata?.onboardingComplete) {
    redirect("/onboarding");
  }

  return (
    <main className="container min-h-screen max-w-screen-xl mx-auto pt-28 flex flex-col">
      <div className='w-full mb-8'>
        <TypographyH2 className='border-none mb-1 pb-0'>Аккаунт</TypographyH2>
        <p className='text-sm text-muted-foreground'>Управляйте информацией своей учетной записи</p>
      </div>
      <div className="flex lg:gap-3 gap-1.5">
        <Navigation className='max-w-60 lg:w-1/3'/>
        <div className="lg:w-2/3 flex-1 py-3 pl-3 border-l">
          {children}
        </div>
      </div>
    </main>
  );
}