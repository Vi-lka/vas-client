import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInLayout({
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
  </>);
}