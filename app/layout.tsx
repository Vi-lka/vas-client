import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header/Header";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--Inter"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
      className={`${inter.variable}`}
    >
      <body className="font-Inter bg-background scroll-smooth">
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
