import React from "react";

import Sidebar from "./sidebar/Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-neutral-950">
      <div className="flex-grow overflow-auto">
        <div className="flex h-full">
          <Sidebar />
          <section className="relative mx-auto w-full max-w-screen overflow-auto">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
}
