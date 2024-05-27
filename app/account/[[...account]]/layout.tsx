import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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

  return (<>
    {children}
  </>);
}