"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
