import { SWRProvider } from "@/components/providers/swr-provider"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Sonner } from "@/components/ui/sonner";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SWRProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="font-Inter overflow-hidden w-full">
          <SidebarTrigger />
          {children}
          <Sonner />
        </main>
      </SidebarProvider>
    </SWRProvider>
  );
}
