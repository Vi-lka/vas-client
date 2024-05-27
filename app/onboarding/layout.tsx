import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (auth().sessionClaims?.metadata.onboardingComplete === true) {
    redirect("/account");
  }

  return (
    <main className="container mx-auto pt-24">
      {children}
    </main>
  );
}