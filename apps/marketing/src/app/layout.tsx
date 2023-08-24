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
  title: {
    default: "Privacy-first and cookie-free web analytics platform — Trpkit",
    template: "%s — Trpkit",
  },
  description:
    "A privacy-first, cookie-free and end-to-end encrypted alternative to Google Analytics.",
  openGraph: {
    title: "Privacy-first and cookie-free web analytics platform — Trpkit",
    description:
      "A privacy-first, cookie-free and end-to-end encrypted alternative to Google Analytics.",
    url: "https://trpkit.com",
    siteName: "Trpkit",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Trpkit",
    card: "summary_large_image",
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
