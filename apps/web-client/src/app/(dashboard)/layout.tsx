import CommandPalette from "@components/(dashboard)/CommandPalette";
import LayoutMain from "@components/(dashboard)/layout/LayoutMain";
import LayoutSidebar from "@components/(dashboard)/layout/LayoutSidebar";
import Providers from "@components/providers";
import "@styles/globals.css";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="h-full bg-white">
        <Providers>
          <LayoutSidebar />
          <LayoutMain>{children}</LayoutMain>
          <CommandPalette />
        </Providers>
      </body>
    </html>
  );
}
