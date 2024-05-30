import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const currentUser = await getCurrentUser(session.strapiToken!);

  if (currentUser.metadata) {
    redirect("/account");
  }

  return (
    <main className="container mx-auto pt-24">
      {children}
    </main>
  );
}