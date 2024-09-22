import Footer from "@/components/marketing/Footer";
import Header from "@/components/marketing/Header";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex flex-col min-h-svh w-full bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
      <Header />
      <main className="flex flex-1 flex-col lg:min-w-0">{children}</main>
      <Footer />
    </div>
  );
}
