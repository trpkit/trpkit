import Footer from "@/components/marketing/Footer";
import Header from "@/components/marketing/Header";
import { Inter } from "next/font/google";
import type React from "react";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main className="-mt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
