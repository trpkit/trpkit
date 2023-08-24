import React from "react";

export default function BlogArticle({ children }: { children: React.ReactNode }) {
  return (
    <article className="prose prose-invert mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
      {children}
    </article>
  );
}
