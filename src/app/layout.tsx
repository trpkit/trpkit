import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import TrpkitWebVitals from "@/components/external/TrpkitWebVitals";
import { cn } from "@/lib/cn";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trpkit.com"),
  title: {
    default: "Trpkit",
    template: "%s - Trpkit",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable, "antialiased")}>
      <body>
        <TrpkitWebVitals />
        <div className="isolate">{children}</div>
      </body>
    </html>
  );
}
