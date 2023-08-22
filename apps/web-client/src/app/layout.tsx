import { Inter } from "next/font/google";
import React from "react";

import "../styles/globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="h-full bg-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
