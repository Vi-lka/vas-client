import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Sonner } from "@/components/ui/sonner";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/account");
  }

  return (<>
    {children}
    <Sonner />
  </>);
}