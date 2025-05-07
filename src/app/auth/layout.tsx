import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col">
      <div className="flex grow items-center justify-center p-6 lg:p-10">{children}</div>
    </main>
  );
}
