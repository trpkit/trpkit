import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/(marketing)/Footer";
import Header from "@/components/(marketing)/Header";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://trpkit.com"),
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
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://trpkit.com",
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
      <body className="bg-zinc-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
