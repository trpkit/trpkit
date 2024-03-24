import { formatDate } from "@lib/format-date";

interface BlogArticleHeaderProps {
  title: string;
  author: string;
  authorRole: string;
  date: string;
}

export default function BlogArticleHeader({
  title,
  author,
  authorRole,
  date,
}: BlogArticleHeaderProps) {
  return (
    <header className="mx-auto flex max-w-5xl flex-col text-center">
      <h1 className="font-display text-5xl font-medium tracking-tight text-white sm:text-6xl mb-2">
        {title}
      </h1>
      <p className="text-sm text-neutral-400">
        Published by{" "}
        <span className="font-semibold">
          {author} ({authorRole})
        </span>{" "}
        on{" "}
        <time dateTime={date} className="font-semibold">
          {formatDate(date)}
        </time>
      </p>
    </header>
  );
}
