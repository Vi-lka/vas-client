import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Database, Home, Inbox } from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import { getCurrentUser } from "@/lib/queries/getCurrentUser"
import Logo from "@/components/header/Logo"
import Footer from "./footer"

// Menu items.
const items = [
  {
    title: "Главная",
    url: "/",
    icon: Home,
  },
  {
    title: "Данные участников",
    url: "/admin",
    icon: Database,
  },
  {
    title: "Почта",
    url: "/admin/mail",
    icon: Inbox,
  },
]
 
export async function AppSidebar() {
  const session = await getServerSession(authOptions);
  if (!session || !session.strapiToken) {
    redirect("/sign-in");
  }
  const currentUser = await getCurrentUser(session.strapiToken);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link 
          href="/" 
          className='flex gap-2 items-center' 
        >
          <Logo className='w-10 h-10' />
          <h1 className="font-extrabold text-sm tracking-tighter">
            VII (XXIII) Всероссийский
            <strong className="font-extrabold text-primary block">Aрхеологический Cъезд</strong>
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-6">
        <SidebarGroupLabel className="h-fit">Меню</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2">
          <span className="md:text-sm text-xs flex-1">{currentUser.username}</span>
          <Footer />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}