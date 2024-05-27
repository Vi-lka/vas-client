import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (auth().sessionClaims?.metadata.onboardingComplete === true) {
    redirect("/account");
  }

  return (<>
    {children}
  </>);
}