import Notification from "./(main-page-blocks)/Notification";
import About from "./(main-page-blocks)/About";
import AboutBento from "./(main-page-blocks)/AboutBento";
import Directions from "./(main-page-blocks)/Directions";
import Hero from "./(main-page-blocks)/Hero";
import Materials from "./(main-page-blocks)/Materials";
import Place from "./(main-page-blocks)/Place";
import Programm from "./(main-page-blocks)/Programm";
import AllOrgs from  "./(main-page-blocks)/(all-orgs)/AllOrgs"
import Committee from "./(main-page-blocks)/(committee)/Committee";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import { redirect } from "next/navigation";
import getRegistration from "@/lib/queries/getRegistration";

export default async function Home() {

  const session = await getServerSession(authOptions);

  if (session) {
    const currentUser = await getCurrentUser(session.strapiToken!);

    if (!currentUser.metadata) {
      redirect("/onboarding");
    }
  }
  
  const [ registration ] = await Promise.allSettled([ getRegistration() ]);
  const registrationEnabled = registration.status === "fulfilled" ? registration.value : true

  return (
    <main className="flex min-h-screen max-w-screen-xl mx-auto flex-col items-center justify-between">
      <Notification />
      <Hero registration={registrationEnabled} />
      <About />
      <AboutBento />
      <Directions />
      <Programm />
      <Place />
      <Materials />
      <AllOrgs />
      <Committee />
    </main>
  );
}
