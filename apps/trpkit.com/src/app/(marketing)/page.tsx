import Footer from "@/components/marketing/Footer";
import Header from "@/components/marketing/Header";
import Hero from "@/components/marketing/home/Hero";
import type React from "react";

export default function Page() {
  return (
    <>
      <Header />
      <main className="-mt-16">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
