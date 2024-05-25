import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--Inter"
});

export const metadata: Metadata = {
  title: {
    template: '%s | ВАС',
    default: 'VII Всероссийский Aрхеологический Cъезд',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? "https://vas.sfu-kras.ru"),
  description: "Примите участие во Всероссийском археологическом съезде!",
  keywords: ['Всероссийский', 'Археология', 'Cъезд', 'Наука', 'Культурное наследие'],
  category: 'Археология',
  publisher: 'Сибирский Федеральный Университет',
  openGraph: {
    title: "VII Всероссийский Aрхеологический Cъезд",
    description: "Примите участие во Всероссийском археологическом съезде!",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "VII Всероссийский Aрхеологический Cъезд",
    images: "/vas-logo.png",
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="ru"
      suppressHydrationWarning
      className={`${inter.variable} scroll-smooth`}
      style={{scrollBehavior:'smooth'}}
    >
      <body className="font-Inter bg-background scroll-smooth">
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
