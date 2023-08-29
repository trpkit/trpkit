import Comparison from "@components/Comparison";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparison",
};

export default function Page() {
  return <Comparison />;
}
