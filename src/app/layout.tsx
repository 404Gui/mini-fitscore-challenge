import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/common/header";
import Footer from "@/common/footer";
import HeaderMobile from "@/common/header-mobile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitScore - Copiloto da Contratação",
  description: "Copiloto de Contratação e People Analytics com IA que revoluciona processos de RH. Análise preditiva, matching inteligente e insights profundos para decisões de contratação mais assertivas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <HeaderMobile/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
