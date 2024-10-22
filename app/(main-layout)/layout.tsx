import { SWRProvider } from "@/components/providers/swr-provider"
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <SWRProvider>
        {children}
      </SWRProvider>
      <Footer />
    </>
  );
}
