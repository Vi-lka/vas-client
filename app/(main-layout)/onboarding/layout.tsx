import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import { MetadataFormT } from "@/lib/types/forms";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.strapiToken) {
    redirect("/sign-in");
  }

  const currentUser = await getCurrentUser(session.strapiToken);

  const metadataResult = MetadataFormT.safeParse(currentUser.metadata);

  if (metadataResult.success) {
    redirect("/account");
  }

  return (
    <main className="container mx-auto pt-24">
      {children}
    </main>
  );
}