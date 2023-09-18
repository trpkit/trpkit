import React from "react";

export default function LayoutMain({ children }: { children: React.ReactNode }) {
  return (
    <main className="py-10 lg:pl-72 bg-white h-screen">
      <div className="px-4 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}
