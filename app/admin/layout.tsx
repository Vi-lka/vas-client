import { SWRProvider } from "@/components/providers/swr-provider"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SWRProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="font-Inter overflow-hidden">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </SWRProvider>
  );
}
