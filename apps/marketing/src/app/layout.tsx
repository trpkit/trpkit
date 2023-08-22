import Footer from "@components/Footer";
import Header from "@components/Header";
import "@styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trpkit.com"),
  title: "Privacy-first and cookie-free web analytics solution — Trpkit",
  description:
    "A privacy-first, cookie-free and end-to-end encrypted alternative to Google Analytics.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://trpkit.com",
    title: "Privacy-first and cookie-free web analytics solution — Trpkit",
    siteName: "Trpkit",
    description:
      "A privacy-first, cookie-free and end-to-end encrypted alternative to Google Analytics.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-slate-900">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
