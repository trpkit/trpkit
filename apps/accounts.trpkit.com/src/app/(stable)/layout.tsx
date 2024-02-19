import React from "react";
import { Inter } from "next/font/google";
import CookieConsent from "@/components/(stable)/CookieConsent";
import { cn } from "@/lib/cn";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL(`https://${process.env.NEXT_PUBLIC_BASE_URL}`),
  title: {
    default: "Trpkit",
    template: "%s - Trpkit",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", inter.variable)}>
        <div className="flex min-h-screen flex-col">
          <main className="flex flex-1 flex-col">{children}</main>
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
