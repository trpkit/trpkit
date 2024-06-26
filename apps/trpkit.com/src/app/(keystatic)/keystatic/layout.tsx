import KeystaticApp from "@/components/keystatic/KeystaticApp";
import { showAdminUI } from "@/keystatic/keystatic.config";
import { notFound } from "next/navigation";

export default function Layout() {
  if (!showAdminUI) notFound();

  return <KeystaticApp />;
}
