"use client";

import Error from "next/error";

export default function IndexPage() {
  return <Error statusCode={404} />;
}
