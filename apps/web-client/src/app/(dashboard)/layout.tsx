import CommandPalette from "@components/(dashboard)/CommandPalette";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CommandPalette />
    </>
  );
}
